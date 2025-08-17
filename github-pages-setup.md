# GitHub Pages 部署指南

## 方法1：使用 GitHub Pages（推荐）

### 步骤1：创建GitHub仓库
1. 在GitHub上创建一个新的仓库
2. 仓库名称可以是：`3d-cylinder-gallery` 或任何你喜欢的名称

### 步骤2：上传文件
将以下文件上传到仓库：
```
├── index.html
├── script.js
├── 1111.png
├── 2222.png
└── README.md
```

### 步骤3：启用GitHub Pages
1. 进入仓库设置 (Settings)
2. 找到 "Pages" 选项
3. 在 "Source" 中选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

### 步骤4：访问网站
几分钟后，你的网站将在以下地址可用：
```
https://你的用户名.github.io/仓库名/
```

## 方法2：使用 GitHub Actions 自动部署

### 创建 .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 方法3：使用 Netlify（免费托管）

### 步骤1：连接GitHub仓库
1. 访问 [netlify.com](https://netlify.com)
2. 点击 "New site from Git"
3. 选择你的GitHub仓库

### 步骤2：配置部署
- Build command: 留空
- Publish directory: `/`

### 步骤3：访问网站
Netlify会提供一个随机域名，你也可以设置自定义域名。

## 方法4：使用 Vercel（免费托管）

### 步骤1：连接GitHub仓库
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入你的GitHub仓库

### 步骤2：配置部署
- Framework Preset: 选择 "Other"
- Root Directory: `./`
- Build Command: 留空
- Output Directory: `./`

## 文件结构要求

确保你的仓库包含以下文件：
```
repository/
├── index.html          # 主页面
├── script.js           # JavaScript逻辑
├── 1111.png           # 第一张图片
├── 2222.png           # 第二张图片
└── README.md          # 项目说明
```

## 注意事项

1. **图片路径**：确保图片文件在正确位置
2. **HTTPS**：GitHub Pages 自动提供HTTPS，解决跨域问题
3. **缓存**：部署后可能需要几分钟才能看到更新
4. **域名**：GitHub Pages 的域名格式为 `用户名.github.io/仓库名`

## 自定义域名（可选）

如果你想使用自定义域名：
1. 在仓库设置中添加自定义域名
2. 在域名提供商处设置CNAME记录
3. 等待DNS传播（可能需要几小时）

## 故障排除

### 如果图片不显示：
- 检查图片文件名是否正确
- 确保图片已上传到仓库
- 检查浏览器控制台是否有错误

### 如果3D效果不工作：
- 确保通过HTTPS访问
- 检查WebGL是否支持
- 查看浏览器控制台错误信息

## 优势

使用GitHub Pages的优势：
- ✅ 完全免费
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 版本控制
- ✅ 易于更新
- ✅ 解决跨域问题 