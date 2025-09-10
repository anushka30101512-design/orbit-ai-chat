import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove non-persistent notifications
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-accent" />;
      case 'info':
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-l-primary';
      case 'error':
        return 'border-l-destructive';
      case 'warning':
        return 'border-l-accent';
      case 'info':
        return 'border-l-muted-foreground';
    }
  };

  return (
    <Card className={`p-4 border-l-4 ${getBorderColor()} bg-card shadow-lg animate-in slide-in-from-right-full`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-card-foreground">
            {notification.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {notification.message}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(notification.id)}
          className="flex-shrink-0 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

// Convenience hooks for different notification types
export const useSuccessNotification = () => {
  const { addNotification } = useNotifications();
  return (title: string, message: string) => addNotification({ type: 'success', title, message });
};

export const useErrorNotification = () => {
  const { addNotification } = useNotifications();
  return (title: string, message: string) => addNotification({ type: 'error', title, message });
};

export const useWarningNotification = () => {
  const { addNotification } = useNotifications();
  return (title: string, message: string) => addNotification({ type: 'warning', title, message });
};

export const useInfoNotification = () => {
  const { addNotification } = useNotifications();
  return (title: string, message: string) => addNotification({ type: 'info', title, message });
};