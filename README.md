## 项目结构

```
TODO List/
├── backend/          # Spring Boot 后端服务
│   ├── src/
│   │   └── main/
│   │       ├── java/com/todo/
│   │       │   ├── TodoApplication.java
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   ├── repository/
│   │       │   └── entity/
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend/         # React + TypeScript 前端应用
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── README.md         # 本文件
└── DOC.md            # 详细说明文档
```


## 技术栈

### 后端
- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- H2 Database（内存数据库，便于演示）
- Maven

### 前端
- React 18
- TypeScript
- Vite（构建工具）
- Axios（HTTP 客户端）
- Tailwind CSS（样式框架）

## 快速开始

### 前置要求
- JDK 17 或更高版本
- Maven 3.6+
- Node.js 18+ 和 npm

### 启动后端

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

后端服务将在 `http://localhost:8080` 启动

### 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端应用将在 `http://localhost:5173` 启动

## API 接口说明

### 获取所有待办事项
- **GET** `/api/todos`
- 响应：待办事项列表

### 根据ID获取待办事项
- **GET** `/api/todos/{id}`
- 响应：单个待办事项

### 创建待办事项
- **POST** `/api/todos`
- 请求体：
```json
{
  "title": "待办事项标题",
  "description": "描述（可选）",
  "category": "工作|学习|生活",
  "priority": "高|中|低",
  "dueDate": "2025-01-31"
}
```

### 更新待办事项
- **PUT** `/api/todos/{id}`
- 请求体：同创建接口

### 删除待办事项
- **DELETE** `/api/todos/{id}`

### 切换完成状态
- **PATCH** `/api/todos/{id}/toggle`

### 搜索待办事项
- **GET** `/api/todos/search?keyword={关键词}`

