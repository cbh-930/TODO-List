import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

/**
 * 待办事项列表组件
 */
export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">暂无待办事项</p>
        <p className="text-sm mt-2">点击上方"添加待办事项"按钮开始创建</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

