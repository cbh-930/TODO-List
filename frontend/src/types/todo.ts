/**
 * 待办事项类型定义
 */
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
  priority?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 创建待办事项的请求类型
 */
export interface CreateTodoRequest {
  title: string;
  description?: string;
  category?: string;
  priority?: string;
  dueDate?: string;
}

