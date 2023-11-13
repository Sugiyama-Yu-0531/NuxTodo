export type TaskList = {
  id: string;
  title: string;
  date: string;
  remarks: string;
  isDeleted: boolean;
  isCompleted: boolean;
}

export const useTaskList = () => {
  const taskList = useState<TaskList[]>('taskList', () => [
    {
      id: '5c2fa3a5-a971-1981-289a-ad13eaf3f8df',
      title: 'タイトル1',
      date: '2023/12/31',
      remarks: '●●商店で鉛筆を1ダース購入後、×マーケットで卵を買う',
      isDeleted: false,
      isCompleted: false,
    },
    {
      id: 'cd8b0f4e-1b07-03e8-57df-763383ba1ad3',
      title: 'タイトル2',
      date: '2023/12/31',
      remarks: '●●商店で鉛筆を11212ダース購入後、×マーケットで卵を買う',
      isDeleted: false,
      isCompleted: false,
    },
    {
      id: '5d1945a0-bc12-0047-91f7-cf2f32fc8617',
      title: 'タイトル3',
      date: '2023/12/31',
      remarks: '●●商店で鉛筆を12222ダース購入後、×マーケットで11卵を買う',
      isDeleted: false,
      isCompleted: false,
    }
  ]);

  const addList = (item: TaskList) => {
    taskList.value = [...taskList.value, item];
  }

  // リスト削除
  const deleteList = (item: TaskList) => {
    taskList.value = taskList.value.filter((task) => task.id !== item.id);
  }

  return {
    taskList,
    addList,
    deleteList,
  }
}