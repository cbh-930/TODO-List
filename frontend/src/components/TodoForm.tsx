import { useState, FormEvent } from 'react';
import { CreateTodoRequest } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: CreateTodoRequest) => void;
  initialData?: CreateTodoRequest;
  onCancel?: () => void;
}

/**
 * 待办事项表单组件
 */
export default function TodoForm({ onSubmit, initialData, onCancel }: TodoFormProps) {
  const [formData, setFormData] = useState<CreateTodoRequest>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    priority: initialData?.priority || '',
    dueDate: initialData?.dueDate || '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('请输入标题');
      return;
    }
    onSubmit(formData);
    // 重置表单
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: '',
      dueDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? '编辑待办事项' : '添加待办事项'}
      </h2>
      
      <div className="space-y-4">
        {/* 标题 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            标题 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入待办事项标题"
            required
          />
        </div>

        {/* 描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            描述
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入描述（可选）"
            rows={3}
          />
        </div>

        {/* 分类和优先级 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分类
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择分类</option>
              <option value="工作">工作</option>
              <option value="学习">学习</option>
              <option value="生活">生活</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              优先级
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择优先级</option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </div>
        </div>

        {/* 截止日期 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            截止日期
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 按钮 */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            {initialData ? '更新' : '添加'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              取消
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

