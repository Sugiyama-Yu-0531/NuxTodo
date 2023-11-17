export type TaskList = {
  id: string;
  userId: string;
  title: string;
  date: string;
  remarks: string;
  isCompleted: boolean;
  isImportant: boolean;
}

export type NoIdTaskList = {
  userId: string;
  title: string;
  date: string;
  remarks: string;
  isCompleted: boolean;
  isImportant: boolean;
}
