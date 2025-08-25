import { io, Socket } from 'socket.io-client';
import Echo from 'laravel-echo';

// Socket.IO configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'ws://localhost:6001';

let socket: Socket | null = null;
let echo: any | null = null;

// Initialize Socket.IO connection
export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: false,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  return socket;
};

// Initialize Laravel Echo with Socket.IO
export const initializeEcho = (): any => {
  if (!echo) {
    // Ensure Socket.IO is available globally for Laravel Echo
    (window as any).io = io;

    echo = new Echo({
      broadcaster: 'socket.io',
      host: SOCKET_URL,
      auth: {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      },
    });
  }

  return echo;
};

// Get authentication token (from sessionStorage in this case)
const getAuthToken = (): string | null => {
  try {
    return sessionStorage.getItem('auth_token');
  } catch (error) {
    console.error('Failed to get auth token:', error);
    return null;
  }
};

// Subscribe to user-specific notifications
export const subscribeToNotifications = (userId: string, callback: (notification: any) => void) => {
  const echoInstance = initializeEcho();
  
  return echoInstance
    .private(`App.Models.User.${userId}`)
    .notification((notification: any) => {
      console.log('New notification received:', notification);
      callback(notification);
    });
};

// Subscribe to general app notifications
export const subscribeToAppNotifications = (callback: (data: any) => void) => {
  const echoInstance = initializeEcho();
  
  return echoInstance
    .channel('app-notifications')
    .listen('AppNotification', (data: any) => {
      console.log('App notification received:', data);
      callback(data);
    });
};

// Disconnect and cleanup
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  
  if (echo) {
    echo.disconnect();
    echo = null;
  }
};

// Get current socket instance
export const getSocket = (): Socket | null => socket;

// Get current echo instance
export const getEcho = (): any | null => echo;