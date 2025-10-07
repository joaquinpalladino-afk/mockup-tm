'use client';

import { useState } from 'react';
import { ChevronDown, Search, Check, Trash2, Plus } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { NewTask } from '@/components/NewTask';
import { TaskDetail } from '@/components/TaskDetail';

const tags = ["All", "Work", "Personal", "Urgent", "Shopping"];

const pendingTasks: Task[] = [
  { id: 1, title: "Finish Q3 report", description: "Complete the financial analysis and submit to management.", dueDate: "2023-10-15", priority: "high", tags: ["Work"], status: "pending" },
  { id: 2, title: "Design new landing page", description: "Create mockups for the new marketing campaign.", dueDate: "2023-10-20", priority: "medium", tags: ["Design"], status: "pending" },
  { id: 3, title: "Call the electrician", description: "Schedule an appointment to fix the kitchen light.", dueDate: "2023-10-12", priority: "high", tags: ["Home"], status: "pending" },
  { id: 4, title: "Buy groceries", description: "Milk, eggs, bread, and coffee.", dueDate: "2023-10-11", priority: "low", tags: ["Shopping"], status: "pending" },
  { id: 5, title: "Plan weekend trip", description: "Research destinations and book accommodation.", dueDate: "2023-10-14", priority: "medium", tags: ["Personal"], status: "pending" },
];

const completedTasks: Task[] = [
  { id: 6, title: "Onboard new team member", description: "Initial meeting and project overview.", dueDate: "2023-10-05", priority: "high", tags: ["Work"], status: "completed" },
  { id: 7, title: "Fix login bug", description: "Patched the authentication flow vulnerability.", dueDate: "2023-10-02", priority: "high", tags: ["Bug"], status: "completed" },
  { id: 8, title: "Pay monthly bills", description: "Internet, electricity, and water.", dueDate: "2023-10-01", priority: "medium", tags: ["Finance"], status: "completed" },
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

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  tags: string[];
  status: string;
};

const TaskCard = ({ task, onTaskClick }: { task: Task, onTaskClick: (task: Task) => void }) => {
  const { title, description, dueDate, priority, tags, status } = task;
  const isCompleted = status === 'completed';

  const priorityColors: { [key: string]: string } = {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    low: 'bg-green-500/20 text-green-400',
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      onClick={() => onTaskClick(task)}
      className={`rounded-lg p-4 shadow-lg transition-colors duration-300 flex flex-col justify-between h-full cursor-pointer ${
        isCompleted
          ? 'bg-[#2a2a2a]/50 border border-[#333333]'
          : 'bg-[#2a2a2a] border border-[#444444] hover:border-[#156193]'
      }`}
    >
      <div>
        <h3 className={`font-bold text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-gray-200'}`}>{title}</h3>
        <p className={`text-sm mt-1 ${isCompleted ? 'line-through text-gray-600' : 'text-gray-400'}`}>{description}</p>
        
        <div className={`mt-4 flex items-center text-xs ${isCompleted ? 'text-gray-600' : 'text-gray-500'}`}>
          <span className={`${isCompleted ? 'line-through' : ''}`}>{new Date(dueDate).toLocaleDateString()}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isCompleted ? 'line-through bg-gray-700 text-gray-500' : priorityColors[priority]}`}>
            {priority}
          </span>
          {tags.map(tag => (
            <span key={tag} className={`px-2 py-1 rounded-full text-xs font-semibold ${isCompleted ? 'line-through bg-gray-700 text-gray-500' : 'bg-blue-500/20 text-blue-400'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {!isCompleted && (
          <button className="p-2 rounded-full hover:bg-green-500/20 text-green-400 transition-colors" onClick={(e) => e.stopPropagation()}>
            <Check size={16} />
          </button>
        )}
        <button className="p-2 rounded-full hover:bg-red-500/20 text-red-400 transition-colors" onClick={(e) => e.stopPropagation()}>
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default function YourTasksPage() {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  return (
    <div className="bg-[#1a1a1a] text-gray-100 min-h-screen p-4 sm:p-8">
      <NewTask isOpen={isNewTaskOpen} onOpenChange={setIsNewTaskOpen} />
      <TaskDetail isOpen={!!selectedTask} onOpenChange={handleCloseDetail} task={selectedTask ? { ...selectedTask, expiresAt: selectedTask.dueDate } : null} />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 pt-10 sm:pt-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Your Tasks</h1>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row items-center mb-10 gap-4 max-w-4xl mx-auto"
      >
        <div className="relative w-full md:w-8/12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search your tasks..."
            className="w-full bg-[#2a2a2a] border border-[#444444] text-gray-300 pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#156193]"
          />
        </div>

        <div className='flex items-center gap-4 w-full md:w-4/12 md:justify-end'>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center justify-between w-full sm:w-auto bg-[#2a2a2a] border border-[#444444] text-gray-300 px-4 py-2.5 rounded-md hover:bg-[#444444] transition-colors">
                <span>Filter by Tag</span>
                <ChevronDown className="h-5 w-5 ml-2" />
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
          <button 
            onClick={() => setIsNewTaskOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] focus:ring-blue-500"
          >
            <Plus size={18} />
            <span className='hidden sm:inline'>New Task</span>
          </button>
        </div>
      </motion.div>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#156193] pb-2 text-gray-200">Pending</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {pendingTasks.map(task => (
              <TaskCard key={task.id} task={task} onTaskClick={handleTaskClick} />
            ))}
          </div>
        </motion.section>

        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-600 pb-2 text-gray-400">Completed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} onTaskClick={handleTaskClick} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}