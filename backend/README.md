# TODO List 后端服务

基于 Spring Boot 3.x 构建的 RESTful API 服务。

## 技术栈

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven
- Lombok

## 环境要求

- JDK 17 或更高版本
- Maven 3.6+

## 启动方式

### 方式一：使用 Maven 命令

```bash
mvn clean install
mvn spring-boot:run
```

### 方式二：使用 IDE

直接运行 `TodoApplication.java` 的 main 方法

## 服务地址

- API 服务: http://localhost:8080
- H2 控制台: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:tododb`
  - 用户名: `sa`
  - 密码: (空)

## API 文档

详见主 README.md 文件。

