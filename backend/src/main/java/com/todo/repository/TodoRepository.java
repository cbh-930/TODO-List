package com.todo.repository;

import com.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 待办事项数据访问层
 * 
 * @author TODO Team
 * @version 1.0.0
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    /**
     * 根据完成状态查询待办事项
     * 
     * @param completed 完成状态
     * @return 待办事项列表
     */
    List<Todo> findByCompleted(Boolean completed);

    /**
     * 根据分类查询待办事项
     * 
     * @param category 分类
     * @return 待办事项列表
     */
    List<Todo> findByCategory(String category);

    /**
     * 搜索待办事项（按标题或描述）
     * 
     * @param keyword 关键词
     * @return 待办事项列表
     */
    @Query("SELECT t FROM Todo t WHERE " +
           "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Todo> searchByKeyword(@Param("keyword") String keyword);

    /**
     * 按优先级排序查询所有待办事项
     * 优先级顺序：高 > 中 > 低 > null
     * 
     * @return 待办事项列表
     */
    @Query("SELECT t FROM Todo t ORDER BY " +
           "CASE t.priority " +
           "WHEN '高' THEN 1 " +
           "WHEN '中' THEN 2 " +
           "WHEN '低' THEN 3 " +
           "ELSE 4 END, t.createdAt DESC")
    List<Todo> findAllOrderByPriority();

    /**
     * 按截止日期排序查询所有待办事项
     * 
     * @return 待办事项列表
     */
    @Query("SELECT t FROM Todo t ORDER BY " +
           "CASE WHEN t.dueDate IS NULL THEN 1 ELSE 0 END, " +
           "t.dueDate ASC, t.createdAt DESC")
    List<Todo> findAllOrderByDueDate();
}

