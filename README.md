## 简易后台用户中心
![yarn](https://img.shields.io/badge/yarn-1.22.11-brightgreen)
![java](https://img.shields.io/badge/Java-1.8-lightgrey)
![docker](https://img.shields.io/badge/docker-23.0.6-blue)
![ant-design-pro](https://img.shields.io/badge/ant--design--pro-5.2.0-orange)
![spring-boot](https://img.shields.io/badge/spring--boot-2.6.4-green)
![junit](https://img.shields.io/badge/junit-4.13.2-yellowgreen)

1、项目简介

用户中心是后台开发中最常用的系统，其实就是一个简单的“用户管理系统”，旨在快速搭建一套简易个人用户管理系统（即Ant Design Pro前端项目模板 + SpringBoot后框架后端），实现了用户注册、登录、查询等基础功能。

 ![](https://raw.githubusercontent.com/jackyrwj/picb/master/20230514101040.png) ![](https://raw.githubusercontent.com/jackyrwj/picb/master/20230514101226.png)

## 2、项目流程

需求分析 => 设计（概要设计、详细设计）=> 技术选型 => 初始化 / 引入需要的技术 => 写 Demo => 写代码（实现业务逻辑） => 测试（单元测试、系统测试）=> 代码提交 / 代码评审 => 部署 => 发布上线

## 3、需求分析

1. 登录 / 注册
2. 用户管理（仅管理员可见）对用户的查询或者修改
3. 用户校验（仅有邀请码用户可注册）

## 4、技术选型

**前端**

主要运用阿里Ant Design生态：

HTML+CSS+JavaScript三件套

React开发框架

Ant Design Pro项目模板

Ant Design端组件库

Umi开发框架

Umi Request请求库

**后端**

spring（依赖注入框架，帮助你管理 Java 对象，集成一些其他的内容）

springmvc（web 框架，提供接口访问、restful接口等能力）

mybatis（Java 操作数据库的框架，持久层框架，对 jdbc 的封装）

mybatis-plus（对 mybatis 的增强，不用写 sql 也能实现增删改查）

springboot（快速启动 / 快速集成项目。不用管理 spring 配置，不用自己整合各种框架

junit 单元测试库

mysql 数据库

Lombok工具库

**部署**

传统nginx + tomcat / docker容器

## 5、部署：多环境/镜像打包/托管平台

**多环境**

指同一套项目代码在不同的阶段需要根据实际情况来调整配置并且部署到不同的机器上。

<u>目的</u>

1.每个环境互不影响

2.区分不同的阶段：开发/测试/生产

3.对项目进行优化：

a.本地日志级别

b,精简依赖，节管项目体积

c.项目的环境/参数可以调整，比如JVM参数

针对不同环境做不同的事情。

<u>多环境分类：</u>

1.本地环境（自己的电脑）localhost

2.开发环境（远程开发）大家连同一台机器，为了大家开发方便

3.测试环境（测试）开发/测试/产品，单元测试/性能测试/功能测试/系统集成测试，独立的数据库、独立的服务器

4.预发布环境（体验服）：和正式环境一致，正式数据库，更严谨，查出更多问题

5.正式环境（线上，公开对外访问的项目）：尽量不要改动，保证上线前的代码是“完美”运行

6.沙箱环境（实验环境）：为了做实验

**镜像打包**

前端

```docker
FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

后端

```docker
FROM maven:3.5-jdk-8-alpine as builder

# Copy local code to the container image.
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build a release artifact.
RUN mvn package -DskipTests

# Run the web service on container startup.
CMD ["java","-jar","/app/target/user-center-backend-0.0.1-SNAPSHOT.jar","--spring.profiles.active=prod"]
```

**前端托管**

前端腾讯云wb应用托管（傻瓜式，不需要自己写构建应用的命令，就能启动前端项目）

·小缺点：需要将代码放到代码托管平台上

·优势：不用写命令、代码更新时自动构建

## 5、项目亮点

1.为了提高开发效率，选用Ant Design Pro脚手架快速搭建基础页面，并对原始模板进行瘦身、抽象为可复用的公共模板，便于后续同类项目的快速研发。

2.在脚手架自带的umi-request请求库基础上进行改造和封装，添加全局请求拦截和全局异常处理逻辑、自动根据项目启动命令来区分环境，减少重复代码、提升项目可维护性。

3.选用MyBatis+MyBatis-Plus进行数据访问层开发，复用大多数通用方法，并且通过继承定制了自己的通用操作模板，大幅提升了项目开发效率。

4.为了明确接口的返回，自定义统一的措误码，并封装了全局异常处理器，从而规范了异常返回、屏蔽了项目冗余的报错细节。

5.对于项目中的SON格式化处理对象，采用双检锁单例模式进行管理，从而复用对象，避免了重复创建对象的开销，便于集中维护管理。

6.采用Ngiⅸ完成前端项目部署、采用Docker容器完成后端项目部署，并且使用宝塔面板对项目进行运维监控。

## 6、项目难点

跨域问题

浏览器为了用户的安全，仅允许向同域名、同端口的服务器发送请求

![](https://raw.githubusercontent.com/jackyrwj/picb/master/20230514101447.png)

**解决：**

如何解决跨域？

1、最直接的方式：把域名、端口改成相同

2、添加跨域头让服务器告诉浏览器：允许跨域（返回cross-origin-allow响应头）

**网关支持(Nginx)**

```java
location ^~ /api/ {
    proxy_pass http://127.0.0.1:8080/api/;
    add_header 'Access-Control-Allow-Origin' $http_origin;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers '*';
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Origin' $http_origin;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
      }
    }
```

**修改后端服务**

1.配置@CrossOrigin注解

2.添加web全局请求拦截器

```java
@Configuration
public class WebMvcConfg implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //设置允许跨域的路径
        registry.addMapping("/**")
                //设置允许跨域请求的域名
                //当**Credentials为true时，**Origin不能为星号，需为具体的ip地址【如果接口不带cookie,ip无需设成具体ip】
                .allowedOrigins("http://localhost:9527", "http://127.0.0.1:9527", "http://127.0.0.1:8082", "http://127.0.0.1:8083")
                //是否允许证书 不再默认开启
                .allowCredentials(true)
                //设置允许的方法
                .allowedMethods("*")
                //跨域允许时间
                .maxAge(3600);
    }
}
```

## 7、项目可扩展点

单点登录
