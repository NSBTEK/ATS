import React, { useState } from 'react';
import { Bell, X, CheckCheck } from 'lucide-react';

const DEMO_NOTIFICATIONS = [
  { id: 1, title: 'New Submission', message: 'Alex Johnson submitted for Senior React Developer', time: '2m ago', read: false, type: 'submission' },
  { id: 2, title: 'Interview Scheduled', message: 'Priya Sharma interview on Apr 5 at 2:00 PM', time: '1h ago', read: false, type: 'interview' },
  { id: 3, title: 'Timesheet Pending', message: 'Alex Johnson timesheet for week of Mar 17 needs approval', time: '3h ago', read: true, type: 'timesheet' },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);

  const unread = notifications.filter(n => !n.read).length;

  const markAll = () => setNotifications(n => n.map(x => ({ ...x, read: true })));
  const dismiss = (id) => setNotifications(n => n.filter(x => x.id !== id));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
      >
        <Bell className="w-4 h-4 text-muted-foreground" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-50 w-80 bg-card border border-border rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="font-semibold text-sm">Notifications</span>
              <button onClick={markAll} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <CheckCheck className="w-3 h-3" /> Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-border">
              {notifications.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No notifications</p>
              ) : notifications.map(n => (
                <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${!n.read ? 'bg-primary/3' : ''}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                  <button onClick={() => dismiss(n.id)} className="text-muted-foreground hover:text-foreground shrink-0">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
