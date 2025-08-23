import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Scale, MessageSquare } from 'lucide-react';
import AppLayout from '@/layout/AppLayout';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { title: t('contracts.title'), value: '156', icon: FileText, color: 'text-blue-600' },
    { title: t('litigations.title'), value: '89', icon: Scale, color: 'text-green-600' },
    { title: t('investigations.title'), value: '34', icon: MessageSquare, color: 'text-orange-600' },
    { title: t('users.title'), value: '12', icon: Users, color: 'text-purple-600' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('navigation.dashboard')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;