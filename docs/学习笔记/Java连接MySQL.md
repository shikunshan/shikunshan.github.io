---
lang: zh-CN
title: Java 连接 MySQL 最简 Demo
description: 2026-05-06-Java连接MySQL最小环境
---

1. 下载 JDK 并配置环境变量
2. 下载 [MySQL](https://dev.mysql.com/downloads/mysql/)
3. 下载 [mysql-connector-j-9.7.0.zip](https://dev.mysql.com/downloads/connector/j/) 并将 `mysql-connector-j-9.7.0.jar` 放到 Java 代码相同目录
4. 编写 Java 代码 ConnectingMysql.java
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class ConnectingMysql {

    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/world?useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "root";

        try (
            Connection conn = DriverManager.getConnection(url, user, password);
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM city limit 10");
            ResultSet rs = ps.executeQuery();
        ) {
            while (rs.next()) {
                int id = rs.getInt("ID");
                String name = rs.getString("Name");
                int population = rs.getInt("Population");

                System.out.println(id + " - " + name + " - " + population);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
5. 执行命令
```cmd
java -cp D:\playground\java-without-idea;D:\playground\java-without-idea\mysql-connector-j-9.7.0.jar ConnectingMysql
```