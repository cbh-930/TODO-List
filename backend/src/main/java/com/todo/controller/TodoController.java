package com.todo.controller;

import com.todo.entity.Todo;
import com.todo.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * 待办事项控制器
 * 提供 RESTful API 接口
 * 
 * @author TODO Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoService todoService;

    /**
     * 获取所有待办事项
     * 
     * @param sortBy 排序方式：priority（优先级）、dueDate（截止日期）、默认按创建时间
     * @return 待办事项列表
     */
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(
            @RequestParam(required = false) String sortBy) {
        try {
            List<Todo> todos;
            if ("priority".equals(sortBy)) {
                todos = todoService.getAllTodosOrderByPriority();
            } else if ("dueDate".equals(sortBy)) {
                todos = todoService.getAllTodosOrderByDueDate();
            } else {
                todos = todoService.getAllTodos();
            }
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            log.error("获取待办事项列表失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 根据ID获取待办事项
     * 
     * @param id 待办事项ID
     * @return 待办事项
     */
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        try {
            Optional<Todo> todo = todoService.getTodoById(id);
            return todo.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("获取待办事项失败，ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 创建待办事项
     * 
     * @param todo 待办事项实体
     * @return 创建后的待办事项
     */
    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo) {
        try {
            Todo createdTodo = todoService.createTodo(todo);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
        } catch (Exception e) {
            log.error("创建待办事项失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 更新待办事项
     * 
     * @param id 待办事项ID
     * @param todo 待办事项实体
     * @return 更新后的待办事项
     */
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody Todo todo) {
        try {
            Optional<Todo> updatedTodo = todoService.updateTodo(id, todo);
            return updatedTodo.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("更新待办事项失败，ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 切换待办事项的完成状态
     * 
     * @param id 待办事项ID
     * @return 更新后的待办事项
     */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleTodo(@PathVariable Long id) {
        try {
            Optional<Todo> todo = todoService.toggleTodo(id);
            return todo.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            log.error("切换待办事项状态失败，ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 删除待办事项
     * 
     * @param id 待办事项ID
     * @return 删除结果
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        try {
            boolean deleted = todoService.deleteTodo(id);
            return deleted
                    ? ResponseEntity.noContent().build()
                    : ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("删除待办事项失败，ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 搜索待办事项
     * 
     * @param keyword 搜索关键词
     * @return 匹配的待办事项列表
     */
    @GetMapping("/search")
    public ResponseEntity<List<Todo>> searchTodos(
            @RequestParam(required = false) String keyword) {
        try {
            List<Todo> todos = todoService.searchTodos(keyword);
            return ResponseEntity.ok(todos);
        } catch (Exception e) {
            log.error("搜索待办事项失败，关键词: {}", keyword, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

