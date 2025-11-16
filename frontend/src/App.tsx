import { useState, useEffect } from 'react';
import { Todo, CreateTodoRequest } from './types/todo';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  searchTodos,
} from './api/todoApi';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

/**
 * 主应用组件
 */
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState<string>('');

  // 加载待办事项列表
  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Todo[];
      if (searchKeyword.trim()) {
        data = await searchTodos(searchKeyword);
      } else {
        data = await getAllTodos(sortBy || undefined);
      }
      setTodos(data);
    } catch (err) {
      setError('加载待办事项失败，请检查后端服务是否启动');
      console.error('加载待办事项失败:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadTodos();
  }, [sortBy]);

  // 搜索功能
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTodos();
    }, 300); // 防抖处理

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // 处理创建待办事项
  const handleCreate = async (todoData: CreateTodoRequest) => {
    try {
      await createTodo(todoData);
      setShowForm(false);
      loadTodos();
    } catch (err) {
      setError('创建待办事项失败');
      console.error('创建失败:', err);
    }
  };

  // 处理更新待办事项
  const handleUpdate = async (todoData: CreateTodoRequest) => {
    if (!editingTodo) return;
    try {
      await updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
      loadTodos();
    } catch (err) {
      setError('更新待办事项失败');
      console.error('更新失败:', err);
    }
  };

  // 处理切换完成状态
  const handleToggle = async (id: number) => {
    try {
      await toggleTodo(id);
      loadTodos();
    } catch (err) {
      setError('更新状态失败');
      console.error('切换状态失败:', err);
    }
  };

  // 处理删除待办事项
  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个待办事项吗？')) {
      return;
    }
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      setError('删除待办事项失败');
      console.error('删除失败:', err);
    }
  };

  // 处理编辑
  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingTodo(null);
    setShowForm(false);
  };

  // 统计信息
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 标题 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TODO List</h1>
          <p className="text-gray-600">管理你的待办事项</p>
        </header>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* 工具栏 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* 搜索框 */}
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="搜索待办事项..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 排序选择 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">默认排序</option>
              <option value="priority">按优先级</option>
              <option value="dueDate">按截止日期</option>
            </select>

            {/* 添加按钮 */}
            <button
              onClick={() => {
                setEditingTodo(null);
                setShowForm(!showForm);
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              {showForm ? '取消' : '添加待办事项'}
            </button>
          </div>

          {/* 统计信息 */}
          <div className="mt-4 text-sm text-gray-600">
            总计: {totalCount} | 已完成: {completedCount} | 未完成:{' '}
            {totalCount - completedCount}
          </div>
        </div>

        {/* 表单 */}
        {showForm && (
          <div className="mb-6">
            <TodoForm
              onSubmit={editingTodo ? handleUpdate : handleCreate}
              initialData={editingTodo || undefined}
              onCancel={editingTodo ? handleCancelEdit : undefined}
            />
          </div>
        )}

        {/* 待办事项列表 */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
}

export default App;

