# AI 聊天应用

这是一个基于 Next.js 的 AI 聊天全栈应用，支持用户认证、实时消息和 AI 对话功能。

## 功能特点

- 用户认证和授权
- 实时消息显示
- AI 智能对话
- 支持多种消息类型
- 响应式设计
- 数据库持久化存储

## 技术栈

- 前端：Next.js 14, React, TailwindCSS
- 后端：Next.js API Routes, Prisma
- 数据库：PostgreSQL
- 认证：NextAuth.js
- AI：OpenAI API

## 开始使用

### 前置要求

- Node.js 18+
- PostgreSQL 数据库
- OpenAI API 密钥

### 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd ai-chat-app
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
复制 `.env.example` 文件为 `.env`，并填写必要的环境变量：
```bash
cp .env.example .env
```

4. 初始化数据库
```bash
npx prisma generate
npx prisma db push
```

5. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 项目结构

```
src/
├── app/                    # Next.js 应用路由
│   ├── api/               # API 路由
│   ├── chat/              # 聊天页面
│   └── login/             # 登录页面
├── components/            # React 组件
├── lib/                   # 工具函数和配置
└── types/                 # TypeScript 类型定义
```

## 开发指南

### 添加新的 AI 模型

1. 在 `src/lib/ai` 目录下创建新的模型适配器
2. 实现 `AIModel` 接口
3. 在配置文件中添加新模型

### 自定义样式

项目使用 TailwindCSS 进行样式管理。可以在 `src/app/globals.css` 中添加自定义样式。

## 部署

1. 构建项目
```bash
npm run build
```

2. 启动生产服务器
```bash
npm start
```

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT
