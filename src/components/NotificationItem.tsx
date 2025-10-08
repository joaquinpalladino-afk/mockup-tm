'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const NotificationItem = ({ notification }: { notification: any }) => {
  const { title, message, timestamp, read } = notification;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      className={`rounded-lg p-4 shadow-lg transition-colors duration-300 flex items-start gap-4 mb-6 ${
        read ? 'bg-[#2a2a2a]/50 border border-[#333333]' : 'bg-[#2a2a2a] border border-[#444444] hover:border-[#156193]'
      }`}
    >
      <div className="flex-grow">
        <h3 className={`font-bold text-lg ${read ? 'text-gray-500' : 'text-gray-200'}`}>{title}</h3>
        <p className={`text-sm mt-1 ${read ? 'text-gray-600' : 'text-gray-400'}`}>{message}</p>
        <span className={`text-xs mt-2 ${read ? 'text-gray-600' : 'text-gray-500'}`}>{timestamp}</span>
      </div>
      {!read && (
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-green-500/20 text-green-400 transition-colors">
            <Check size={16} />
          </button>
          <button className="p-2 rounded-full hover:bg-red-500/20 text-red-400 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
};