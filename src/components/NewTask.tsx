"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { Cross2Icon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Circle } from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  tags: string[];
  status: string;
};

interface NewTaskProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const tags = ["Bug", "Feature", "Enhancement", "Documentation", "Help needed"];

export function NewTask({ isOpen, onOpenChange, onAddTask }: NewTaskProps) {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [priority, setPriority] = React.useState<"high" | "medium" | "low">("medium");

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("expiresAt") as string;

    onAddTask({ title, description, dueDate, priority, tags: selectedTags });
    onOpenChange(false);
    setSelectedTags([]);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#161B22] p-6 shadow-lg focus:outline-none border border-neutral-700">
          <Dialog.Title className="text-lg font-semibold text-center text-[--foreground] m-0 mb-5">
            Create a New Task
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <fieldset className="flex flex-col">
              <label className="text-sm font-medium text-[--foreground] mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="bg-neutral-800 border border-neutral-700 text-[--foreground] text-sm rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="title"
                name="title"
                placeholder="e.g., Implement user authentication"
              />
            </fieldset>

            <fieldset className="flex flex-col">
              <label className="text-sm font-medium text-[--foreground] mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="bg-neutral-800 border border-neutral-700 text-[--foreground] text-sm rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="description"
                name="description"
                rows={4}
                placeholder="Add a more detailed description..."
              />
            </fieldset>

            <fieldset>
              <label className="text-sm font-medium text-[--foreground] mb-2 block">Tags</label>
              <input
                className="bg-neutral-800 border border-neutral-700 text-[--foreground] text-sm rounded-md h-10 px-3 mt-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Or create a new tag"
              />
                            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset>
                <label className="text-sm font-medium text-[--foreground] mb-2 block">Priority</label>
                <Select.Root value={priority} onValueChange={(value: "high" | "medium" | "low") => setPriority(value)}>
                  <Select.Trigger className="inline-flex items-center justify-between rounded-md px-4 h-10 gap-2 bg-neutral-800 border border-neutral-700 text-sm text-[--foreground] hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                    <Select.Value placeholder="Select priority..." />
                    <Select.Icon>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="overflow-hidden bg-neutral-800 rounded-md shadow-lg border border-neutral-700">
                      <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-neutral-800 cursor-default">
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="p-2">
                        <SelectItem value="low"><span className="flex items-center"><Circle className="w-3 h-3 mr-2" fill="green" color="green" /> Low</span></SelectItem>
                        <SelectItem value="medium"><span className="flex items-center"><Circle className="w-3 h-3 mr-2" fill="orange" color="orange" /> Medium</span></SelectItem>
                        <SelectItem value="high"><span className="flex items-center"><Circle className="w-3 h-3 mr-2" fill="red" color="red" /> High</span></SelectItem>
                      </Select.Viewport>
                      <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-neutral-800 cursor-default">
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </fieldset>

              <fieldset className="flex flex-col">
                <label className="text-sm font-medium text-[--foreground] mb-2" htmlFor="expiresAt">
                  Expires At
                </label>
                <input
                  type="datetime-local"
                  className="bg-neutral-800 border border-neutral-700 text-[--foreground] text-sm rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="expiresAt"
                  name="expiresAt"
                />
              </fieldset>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-md px-8 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[--background] focus:ring-blue-500"
              >
                Create Task
              </button>
            </div>
          </form>

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

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="text-sm rounded flex items-center h-8 pr-9 pl-6 relative select-none data-[disabled]:text-neutral-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue-500 data-[highlighted]:text-white"
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
SelectItem.displayName = "SelectItem"
