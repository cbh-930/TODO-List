import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

/**
 * 待办事项项组件
 */
export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case '高':
        return 'bg-red-100 text-red-800';
      case '中':
        return 'bg-yellow-100 text-yellow-800';
      case '低':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case '工作':
        return 'bg-blue-100 text-blue-800';
      case '学习':
        return 'bg-purple-100 text-purple-800';
      case '生活':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today && !todo.completed;
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
        todo.completed
          ? 'border-gray-300 opacity-75'
          : isOverdue(todo.dueDate)
          ? 'border-red-500'
          : 'border-blue-500'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* 完成状态复选框 */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />

        {/* 内容区域 */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-lg font-semibold ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {todo.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(todo)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                编辑
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除
              </button>
            </div>
          </div>

          {todo.description && (
            <p
              className={`mt-2 text-gray-600 ${
                todo.completed ? 'line-through' : ''
              }`}
            >
              {todo.description}
            </p>
          )}

          {/* 标签和日期 */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {todo.category && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                  todo.category
                )}`}
              >
                {todo.category}
              </span>
            )}
            {todo.priority && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  todo.priority
                )}`}
              >
                {todo.priority}优先级
              </span>
            )}
            {todo.dueDate && (
              <span
                className={`text-xs ${
                  isOverdue(todo.dueDate)
                    ? 'text-red-600 font-semibold'
                    : 'text-gray-500'
                }`}
              >
                截止: {formatDate(todo.dueDate)}
                {isOverdue(todo.dueDate) && ' (已逾期)'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

