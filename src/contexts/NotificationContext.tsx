import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { subscribeToNotifications, subscribeToAppNotifications } from '@/services/realtime/socket';
import { Notification } from '@/services/api/types';
import apiClient from '@/services/api/client';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  playNotificationSound: boolean;
  setPlayNotificationSound: (play: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [playNotificationSound, setPlayNotificationSound] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Fetch notifications from API
  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await apiClient.get('/notifications');
      setNotifications(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await apiClient.patch('/notifications/read-all');
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // Play notification sound
  const playSound = () => {
    if (playNotificationSound) {
      try {
        const audio = new Audio('/sounds/notif.mp3');
        audio.volume = 0.5;
        audio.play().catch(console.error);
      } catch (error) {
        console.error('Failed to play notification sound:', error);
      }
    }
  };

  // Handle new notification
  const handleNewNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    
    // Show toast
    toast(notification.title, {
      description: notification.message,
      duration: 5000,
    });
    
    // Play sound
    playSound();
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user?.id) return;

    let userNotificationSubscription: any;
    let appNotificationSubscription: any;

    try {
      // Subscribe to user-specific notifications
      userNotificationSubscription = subscribeToNotifications(
        user.id,
        handleNewNotification
      );

      // Subscribe to app-wide notifications
      appNotificationSubscription = subscribeToAppNotifications(
        handleNewNotification
      );
    } catch (error) {
      console.error('Failed to set up notification subscriptions:', error);
    }

    return () => {
      // Cleanup subscriptions
      if (userNotificationSubscription) {
        userNotificationSubscription.stopListening();
      }
      if (appNotificationSubscription) {
        appNotificationSubscription.stopListening();
      }
    };
  }, [user?.id]);

  // Fetch notifications on mount and when user changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated]);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
    playNotificationSound,
    setPlayNotificationSound,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};