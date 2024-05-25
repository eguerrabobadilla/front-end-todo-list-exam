export interface TodoTask {
  items: Task[]
}

export interface Task{
  _id?: string;
  description: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
