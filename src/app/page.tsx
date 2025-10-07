'use client';

import { ChevronDown, Search } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';

const tags = ["All", "Work", "Personal", "Urgent", "Shopping"];

const pendingTasks = [
  { id: 1, title: "Finish Q3 report", description: "Complete the financial analysis and submit to management." },
  { id: 2, title: "Design new landing page", description: "Create mockups for the new marketing campaign." },
  { id: 3, title: "Call the electrician", description: "Schedule an appointment to fix the kitchen light." },
  { id: 4, title: "Buy groceries", description: "Milk, eggs, bread, and coffee." },
  { id: 5, title: "Plan weekend trip", description: "Research destinations and book accommodation." },
];

const completedTasks = [
  { id: 6, title: "Onboard new team member", description: "Initial meeting and project overview." },
  { id: 7, title: "Fix login bug", description: "Patched the authentication flow vulnerability." },
  { id: 8, title: "Pay monthly bills", description: "Internet, electricity, and water." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const TaskCard = ({ title, description }: { title: string, description: string }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    className="bg-[#2a2a2a] border border-[#444444] rounded-lg p-4 shadow-lg hover:border-[#156193] transition-colors duration-300"
  >
    <h3 className="font-bold text-lg text-gray-200">{title}</h3>
    <p className="text-gray-400 text-sm mt-1">{description}</p>
  </motion.div>
);

export default function YourTasksPage() {
  return (
    <div className="bg-[#1a1a1a] text-gray-100 min-h-screen p-8">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 pt-16"
      >
        <h1 className="text-5xl font-extrabold tracking-tight">Your Tasks</h1>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col-reverse md:flex-row justify-between items-center mb-10 gap-4"
      >
        {/* Search Bar */}
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search your tasks..."
            className="w-full bg-[#2a2a2a] border border-[#444444] text-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156193]"
          />
        </div>

        {/* Tags Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center justify-between w-full md:w-48 bg-[#2a2a2a] border border-[#444444] text-gray-300 px-4 py-2 rounded-md hover:bg-[#444444] transition-colors">
              <span>Filter by Tag</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-48 bg-[#2a2a2a] border border-[#444444] rounded-md shadow-lg text-gray-300"
              sideOffset={5}
            >
              {tags.map(tag => (
                <DropdownMenu.Item
                  key={tag}
                  className="px-4 py-2 hover:bg-[#444444] hover:text-white cursor-pointer focus:outline-none focus:bg-[#444444] focus:text-white"
                >
                  {tag}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </motion.div>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Pending Tasks Column */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#156193] pb-2 text-gray-200">Pending</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {pendingTasks.map(task => (
              <TaskCard key={task.id} title={task.title} description={task.description} />
            ))}
          </motion.div>
        </motion.section>

        {/* Completed Tasks Column */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-600 pb-2 text-gray-400">Completed</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {completedTasks.map(task => (
              <TaskCard key={task.id} title={task.title} description={task.description} />
            ))}
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}