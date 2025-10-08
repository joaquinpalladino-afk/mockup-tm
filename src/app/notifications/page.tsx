'use client';

import { motion } from 'framer-motion';
import { NotificationItem } from '@/components/NotificationItem';

const notifications = [
  {
    id: 1,
    type: 'task-completed',
    title: 'Task Completed!',
    message: 'Your task "Finish Q3 report" has been marked as completed.',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'new-task',
    title: 'New Task Assigned',
    message: 'You have been assigned a new task: "Design new landing page".',
    timestamp: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'deadline-reminder',
    title: 'Deadline Reminder',
    message: 'Your task "Call the electrician" is due tomorrow.',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'comment',
    title: 'New Comment',
    message: 'John Doe commented on your task "Plan weekend trip".',
    timestamp: '2 days ago',
    read: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function NotificationsPage() {
  return (
    <div className="bg-[#1a1a1a] text-gray-100 min-h-screen p-4 sm:p-8">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 pt-10 sm:pt-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Notifications</h1>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </motion.div>
    </div>
  );
}