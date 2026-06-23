# 出海合规服务平台 Demo

这是一个可直接部署的前端演示页面，用来展示出海合规服务平台的主要功能。

## 可以演示的功能

- 智能合规问答：点击推荐问题或手动输入问题，会得到演示回答。
- 服务商目录：按国家/地区和服务类型筛选服务商。
- 服务商详情：查看服务范围、覆盖国家、联系方式，并发起本地演示询价。
- 服务商入驻：填写表单、选择服务类型和覆盖国家，提交后展示成功状态。
- 我的订单：展示服务需求和处理状态。
- 演示后台：展示服务商、订单和平台统计概览。

所有交互都在浏览器中完成，不依赖后端服务器，适合作为 GitHub 项目的前端 demo 页面。

## 本地运行

```bash
npm install
npm run dev
```

## 检查和打包

```bash
npm run check
npm run build
```

打包后的文件会生成在 `dist` 目录。

## 自动部署

项目已加入 GitHub Pages 自动部署流程：

1. 推送到 `main` 分支后，GitHub Actions 会自动安装依赖、检查项目并打包。
2. 打包产物会发布到 GitHub Pages。
3. 部署完成后，页面地址通常是：

```text
https://lantian1071.github.io/oversea_compliance_platform/
```

如果第一次使用 GitHub Pages，需要在仓库的 Settings -> Pages 中确认 Source 选择为 GitHub Actions。
