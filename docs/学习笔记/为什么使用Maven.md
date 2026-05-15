---
lang: zh-CN
title: 为什么使用 Maven
description: 2026-05-06-使用Maven的原因以及最小demo
---

# 使用 Maven 的原因
> 由于 Java 开发需要用到很多其他开发者开发出的成熟的代码（大多以 jar 包的形式存在于网络上）
> 如果每次运行项目都手动指定路径并下载依赖，甚至之后将项目进行打包发布都特别复杂
> 因此我们需要使用 Maven 对 Java 项目进行统一管理
# 使用 Maven 运行 Java 项目的最小 demo
### 1. 下载 [JDK](https://www.oracle.com/java/technologies/javase/jdk17-0-13-later-archive-downloads.html) 并配置环境变量
### 2. 下载 [MySQL](https://dev.mysql.com/downloads/mysql/)
### 3. 创建文件夹 jdbc-demo 并且在里面创建如下目录结构
```
my-app
├── pom.xml
└── src
    └── main
        └── java
            └── com/example/ConnectingMysql.java
```
其中 `pom.xml` 文件的内容如下
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="
         http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>jdbc-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!-- MySQL JDBC Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.3.0</version>
        </dependency>
    </dependencies>

</project>
```
`ConnectingMysql.java` 的内容如下
```java
package com.example;

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
### 4. 编译并运行项目
打开 `jdbc-demo` 的文件夹的命令行窗口输入 `mvn compile` 命令编译项目
```bash
D:\playground\java-without-idea\jdbc-demo>mvn compile
[INFO] Scanning for projects...
[INFO]
[INFO] -----------------------< com.example:jdbc-demo >------------------------
[INFO] Building jdbc-demo 1.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- resources:3.4.0:resources (default-resources) @ jdbc-demo ---
[WARNING] Using platform encoding (GBK actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory D:\playground\java-without-idea\jdbc-demo\src\main\resources
[INFO]
[INFO] --- compiler:3.15.0:compile (default-compile) @ jdbc-demo ---
[INFO] Recompiling the module because of changed source code.
[WARNING] File encoding has not been set, using platform encoding GBK, i.e. build is platform dependent!
[INFO] Compiling 1 source file with javac [debug target 1.8] to target\classes
[WARNING] 未与 -source 8 一起设置引导类路径
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  3.706 s
[INFO] Finished at: 2026-05-06T14:42:42+08:00
[INFO] ------------------------------------------------------------------------

D:\playground\java-without-idea\jdbc-demo>
```
输入 `mvn exec:java -Dexec.mainClass="com.example.ConnectingMysql"` 运行项目
``` bash
D:\playground\java-without-idea\jdbc-demo>mvn exec:java -Dexec.mainClass="com.example.ConnectingMysql"
[INFO] Scanning for projects...
Downloading from central: https://repo.maven.apache.org/maven2/org/codehaus/mojo/maven-metadata.xml
Downloading from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-metadata.xml
Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-metadata.xml (14 kB at 13 kB/s)
Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/mojo/maven-metadata.xml (21 kB at 11 kB/s)
Downloading from central: https://repo.maven.apache.org/maven2/org/codehaus/mojo/exec-maven-plugin/maven-metadata.xml
Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/mojo/exec-maven-plugin/maven-metadata.xml (1.1 kB at 4.7 kB/s)
[INFO]
[INFO] -----------------------< com.example:jdbc-demo >------------------------
[INFO] Building jdbc-demo 1.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- exec:3.6.3:java (default-cli) @ jdbc-demo ---
1 - Kabul - 1780000
2 - Qandahar - 237500
3 - Herat - 186800
4 - Mazar-e-Sharif - 127800
5 - Amsterdam - 731200
6 - Rotterdam - 593321
7 - Haag - 440900
8 - Utrecht - 234323
9 - Eindhoven - 201843
10 - Tilburg - 193238
```