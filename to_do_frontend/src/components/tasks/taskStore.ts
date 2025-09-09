import { $, useSignal } from "@builder.io/qwik";

/**
 * Task object shape used throughout the to-do application.
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  /** Display text of the task */
  text: string;
  /** Completion status */
  completed: boolean;
}

/**
 * Global signal containing the list of tasks.
 * Components can import and read/modify this signal directly or through the helper functions below.
 */
/* eslint-disable-next-line qwik/use-method-usage -- creating a global store is intentional */
export const taskStore = useSignal<Task[]>([]);

/* ---------------------------------------------------------------------------
 * Helper functions
 * -------------------------------------------------------------------------*/

/* PUBLIC_INTERFACE */
export const addTask = $((text: string) => {
  /**
   * Adds a new task to the store.
   * @param text - Text for the task
   */
  const newTask: Task = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };
  taskStore.value = [...taskStore.value, newTask];
});

/* PUBLIC_INTERFACE */
export const editTask = $((id: string, newText: string) => {
  /**
   * Edits the text of an existing task.
   * @param id - Task identifier
   * @param newText - Updated text
   */
  taskStore.value = taskStore.value.map((task: Task) =>
    task.id === id ? { ...task, text: newText } : task,
  );
});

/* PUBLIC_INTERFACE */
export const toggleComplete = $((id: string) => {
  /**
   * Toggles the completion status of a task.
   * @param id - Task identifier
   */
  taskStore.value = taskStore.value.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
});

/* PUBLIC_INTERFACE */
export const removeTask = $((id: string) => {
  /**
   * Removes a task from the store.
   * @param id - Task identifier
   */
  taskStore.value = taskStore.value.filter((task: Task) => task.id !== id);
});
