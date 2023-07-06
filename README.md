# nest admin
基于 nestjs，prisma，postgresql 

## 安装依赖

```bash
$ pnpm install
```

## 启动

```bash
# 开发启动命令
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## prisma使用
```bash
# 生成client目录
$ pnpm run prisma:generate
 
# 会把schema.prisma定义的表结构生成到数据库、并生成client
$ pnpm run prisma
```

## 项目结构
```
  .
├── config // 项目配置
├── dist // 打包后的文件
├── prisma // 数据库表结构定义
├── src  // 代码目录
│   ├── common // 常用配置及方法
│   ├── auth // jwt授权逻辑
│   ├── controller // controller层
│   ├── dto // request、response类型定义
│   ├── entity // 实体类定义目录
│   └── service // service层
```
