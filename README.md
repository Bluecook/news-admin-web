### Node.js后端+Vue前端全栈新闻管理

###新项目支持ts,后台数据改为mysql
```
https://github.com/Bluecook/News
```

db存放的是数据库(手动创建一个db文件夹)

server存放的是Nodejs项目

admin文件夹存放的是后台管理项目，web存放的是web前端网页

数据库使用：MongoDB数据库

后端项目技术：express+mongoose

前端项目技术：Vue3+pinia+vue-router+element-plus

前端项目使用vite创建

#### 项目使用文档

准备工作

安装Node.JS、MongoDB数据库、npm，Node要安装好vite

1. 首先要在db文件夹中创建数据库

   ![image-20230301175140206](C:\Users\元龙浜\AppData\Roaming\Typora\typora-user-images\image-20230301175140206.png)

   创建好数据库要首先自己手动添加一个用户名和密码（只需用户名和密码即可）

2. server文件夹中的config文件夹下的文件是连接数据库的

3. 使用node项目和前端项目均需要先安装依赖

4. ```
   npm i install
   ```

5. Node项目启动命令（在server文件夹下）

6. ```
   npm run start
   ```

7. 前端项目启动命令（在web和admin文件夹）

8. ```
   npm run dev
   ```


