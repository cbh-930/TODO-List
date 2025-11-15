package com.todo.service;

import com.todo.entity.Todo;
import com.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * 待办事项业务逻辑层
 * 
 * @author TODO Team
 * @version 1.0.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TodoService {

    private final TodoRepository todoRepository;

    /**
     * 获取所有待办事项
     * 
     * @return 待办事项列表
     */
    public List<Todo> getAllTodos() {
        log.info("获取所有待办事项");
        return todoRepository.findAll();
    }

    /**
     * 根据ID获取待办事项
     * 
     * @param id 待办事项ID
     * @return 待办事项（如果存在）
     */
    public Optional<Todo> getTodoById(Long id) {
        log.info("根据ID获取待办事项: {}", id);
        return todoRepository.findById(id);
    }

    /**
     * 创建待办事项
     * 
     * @param todo 待办事项实体
     * @return 保存后的待办事项
     */
    @Transactional
    public Todo createTodo(Todo todo) {
        log.info("创建待办事项: {}", todo.getTitle());
        // 确保初始状态为未完成
        if (todo.getCompleted() == null) {
            todo.setCompleted(false);
        }
        return todoRepository.save(todo);
    }

    /**
     * 更新待办事项
     * 
     * @param id 待办事项ID
     * @param todo 待办事项实体
     * @return 更新后的待办事项（如果存在）
     */
    @Transactional
    public Optional<Todo> updateTodo(Long id, Todo todo) {
        log.info("更新待办事项: {}", id);
        return todoRepository.findById(id)
                .map(existingTodo -> {
                    existingTodo.setTitle(todo.getTitle());
                    existingTodo.setDescription(todo.getDescription());
                    existingTodo.setCategory(todo.getCategory());
                    existingTodo.setPriority(todo.getPriority());
                    existingTodo.setDueDate(todo.getDueDate());
                    // 注意：这里不更新 completed 状态，使用专门的 toggle 方法
                    return todoRepository.save(existingTodo);
                });
    }

    /**
     * 切换待办事项的完成状态
     * 
     * @param id 待办事项ID
     * @return 更新后的待办事项（如果存在）
     */
    @Transactional
    public Optional<Todo> toggleTodo(Long id) {
        log.info("切换待办事项完成状态: {}", id);
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setCompleted(!todo.getCompleted());
                    return todoRepository.save(todo);
                });
    }

    /**
     * 删除待办事项
     * 
     * @param id 待办事项ID
     * @return 是否删除成功
     */
    @Transactional
    public boolean deleteTodo(Long id) {
        log.info("删除待办事项: {}", id);
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * 搜索待办事项
     * 
     * @param keyword 搜索关键词
     * @return 匹配的待办事项列表
     */
    public List<Todo> searchTodos(String keyword) {
        log.info("搜索待办事项，关键词: {}", keyword);
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllTodos();
        }
        return todoRepository.searchByKeyword(keyword.trim());
    }

    /**
     * 按优先级排序获取所有待办事项
     * 
     * @return 排序后的待办事项列表
     */
    public List<Todo> getAllTodosOrderByPriority() {
        log.info("按优先级排序获取所有待办事项");
        return todoRepository.findAllOrderByPriority();
    }

    /**
     * 按截止日期排序获取所有待办事项
     * 
     * @return 排序后的待办事项列表
     */
    public List<Todo> getAllTodosOrderByDueDate() {
        log.info("按截止日期排序获取所有待办事项");
        return todoRepository.findAllOrderByDueDate();
    }
}

