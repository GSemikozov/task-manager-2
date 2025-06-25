export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
  categoryId: number | null;
} 