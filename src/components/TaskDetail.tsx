"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Circle } from "lucide-react";

interface TaskDetailProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  task: {
    title: string;
    description: string;
    tags: string[];
    priority: "low" | "medium" | "high";
    expiresAt: string;
  } | null;
}

const priorityMap = {
  low: { label: "Low", color: "green" },
  medium: { label: "Medium", color: "orange" },
  high: { label: "High", color: "red" },
};

export function TaskDetail({ isOpen, onOpenChange, task }: TaskDetailProps) {
  if (!task) {
    return null;
  }

  const { title, description, tags, priority, expiresAt } = task;
  const priorityInfo = priorityMap[priority];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#161B22] p-6 shadow-lg focus:outline-none border border-neutral-700">
          <Dialog.Title className="text-lg font-semibold text-center text-[--foreground] m-0 mb-5">
            Task Details
          </Dialog.Title>
          
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-sm font-medium text-neutral-400 mb-1">Title</h3>
              <p className="text-[--foreground]">{title}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-400 mb-1">Description</h3>
              <p className="text-[--foreground] whitespace-pre-wrap">{description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-400 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-neutral-700 text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2">Priority</h3>
                <div className="flex items-center">
                  <Circle className={`w-3 h-3 mr-2`} fill={priorityInfo.color} color={priorityInfo.color} />
                  <span className="text-[--foreground]">{priorityInfo.label}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2">Expires At</h3>
                <p className="text-[--foreground]">
                  {new Date(expiresAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-md px-8 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[--background] focus:ring-blue-500"
              >
                Close
              </button>
            </div>

          <Dialog.Close asChild>
            <button
              className="text-neutral-400 hover:bg-neutral-700 absolute top-3 right-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-500"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
