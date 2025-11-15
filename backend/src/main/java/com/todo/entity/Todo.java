package com.todo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 待办事项实体类
 * 
 * @author TODO Team
 * @version 1.0.0
 */
@Entity
@Table(name = "todos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    /**
     * 主键ID，自动生成
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 待办事项标题（必填）
     */
    @NotBlank(message = "标题不能为空")
    @Size(max = 200, message = "标题长度不能超过200个字符")
    @Column(nullable = false, length = 200)
    private String title;

    /**
     * 待办事项描述（可选）
     */
    @Size(max = 1000, message = "描述长度不能超过1000个字符")
    @Column(length = 1000)
    private String description;

    /**
     * 是否完成
     */
    @Column(nullable = false)
    private Boolean completed = false;

    /**
     * 任务分类：工作、学习、生活
     */
    @Column(length = 20)
    private String category;

    /**
     * 优先级：高、中、低
     */
    @Column(length = 10)
    private String priority;

    /**
     * 截止日期
     */
    @Column
    private LocalDate dueDate;

    /**
     * 创建时间
     */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * 在持久化前自动设置创建时间和更新时间
     */
    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    /**
     * 在更新前自动更新时间
     */
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

