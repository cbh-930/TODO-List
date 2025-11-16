import axios from 'axios';
import { Todo, CreateTodoRequest } from '../types/todo';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 获取所有待办事项
 * @param sortBy 排序方式：priority（优先级）、dueDate（截止日期）
 */
export const getAllTodos = async (sortBy?: string): Promise<Todo[]> => {
  const response = await api.get<Todo[]>('/todos', {
    params: sortBy ? { sortBy } : undefined,
  });
  return response.data;
};

/**
 * 根据ID获取待办事项
 */
export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await api.get<Todo>(`/todos/${id}`);
  return response.data;
};

/**
 * 创建待办事项
 */
export const createTodo = async (todo: CreateTodoRequest): Promise<Todo> => {
  const response = await api.post<Todo>('/todos', todo);
  return response.data;
};

/**
 * 更新待办事项
 */
export const updateTodo = async (
  id: number,
  todo: CreateTodoRequest
): Promise<Todo> => {
  const response = await api.put<Todo>(`/todos/${id}`, todo);
  return response.data;
};

/**
 * 切换待办事项的完成状态
 */
export const toggleTodo = async (id: number): Promise<Todo> => {
  const response = await api.patch<Todo>(`/todos/${id}/toggle`);
  return response.data;
};

/**
 * 删除待办事项
 */
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};

/**
 * 搜索待办事项
 */
export const searchTodos = async (keyword: string): Promise<Todo[]> => {
  const response = await api.get<Todo[]>('/todos/search', {
    params: { keyword },
  });
  return response.data;
};

