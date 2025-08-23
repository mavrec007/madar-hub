import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContractsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('contracts.title')}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{t('contracts.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قريباً - صفحة إدارة العقود</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ContractsPage;