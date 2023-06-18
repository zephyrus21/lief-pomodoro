import CreateTask from '@/components/CreateTask';
import List from '@/components/List';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <div>
      <div>Hello World</div>
      <List />
      <CreateTask />
      <TaskList />
    </div>
  );
}
