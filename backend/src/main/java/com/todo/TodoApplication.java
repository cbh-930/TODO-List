package com.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TODO List 应用主启动类
 * 
 * @author TODO Team
 * @version 1.0.0
 */
@SpringBootApplication
public class TodoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
        System.out.println("========================================");
        System.out.println("TODO List 后端服务启动成功！");
        System.out.println("服务地址: http://localhost:8080");
        System.out.println("H2 控制台: http://localhost:8080/h2-console");
        System.out.println("========================================");
    }
}

