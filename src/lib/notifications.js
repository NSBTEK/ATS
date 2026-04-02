// src/lib/notifications.js

// Local notifications stub - logs to console instead of sending emails
export async function sendNotification({ module, action, record, user, notifyEmails = [] }) {
  console.log(`[Notification] ${module} ${action}`, { record, user, notifyEmails });
  return Promise.resolve();
}

// Named export expected by Submissions.jsx
export const notifyChange = sendNotification;