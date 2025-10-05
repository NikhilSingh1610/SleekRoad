import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function NotificationsPage({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p className="text-muted-foreground mb-6">Your recent notifications will appear here.</p>
        <div className="flex gap-2">
          <Button variant="black" onClick={onBack}>Back</Button>
        </div>
      </Card>
    </div>
  );
}
