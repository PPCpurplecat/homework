# 3D圆柱图片展示网站

这是一个使用Three.js创建的3D网站，可以将两张图片连接并展示为圆柱状效果，支持第一人称视角探索。

## 🌟 功能特点

- **3D圆柱展示**: 将两张图片（1111.png和2222.png）连接并包裹在圆柱表面
- **第一人称视角**: 支持WASD移动和鼠标视角控制
- **白色地板**: 场景底部的白色半透明地板
- **蓝色天花板**: 场景顶部的蓝色半透明天花板
- **边界限制**: 玩家只能在圆柱形成的圆形范围内移动
- **交互控制**: 
  - WASD键移动
  - 鼠标控制视角
  - 空格键跳跃
  - 重置位置按钮

## 🚀 在线演示

访问在线演示：[GitHub Pages](https://你的用户名.github.io/仓库名/)

## 📁 文件结构

```
├── index.html          # 主HTML文件
├── script.js           # JavaScript逻辑文件
├── 1111.png           # 第一张图片
├── 2222.png           # 第二张图片
├── README.md          # 项目说明
├── github-pages-setup.md  # GitHub Pages部署指南
└── .github/workflows/deploy.yml  # 自动部署配置
```

## 🎮 操作说明

1. **开始控制**: 点击屏幕激活鼠标控制
2. **移动**: 使用WASD键在圆柱内移动
3. **视角**: 移动鼠标控制视角
4. **跳跃**: 按空格键跳跃
5. **退出控制**: 按ESC键退出鼠标控制
6. **重置**: 点击"重置位置"按钮回到中心

## 🛠️ 本地运行

### 方法1：使用Python服务器
```bash
# 启动本地服务器
python -m http.server 8000

# 访问网站
http://localhost:8000
```

### 方法2：使用Node.js
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
http-server

# 访问网站
http://localhost:8080
```

## 🌐 GitHub Pages 部署

### 快速部署步骤：

1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库设置 (Settings)
   - 找到 "Pages" 选项
   - 选择 "Deploy from a branch"
   - 选择 "main" 分支和 "/ (root)" 文件夹

3. **访问网站**
   - 几分钟后，网站将在 `https://你的用户名.github.io/仓库名/` 可用

### 自动部署（推荐）

项目已包含GitHub Actions配置，推送代码到main分支后会自动部署。

## 🔧 技术实现

- **Three.js**: 3D图形渲染库
- **WebGL**: 硬件加速渲染
- **Canvas API**: 图片合并处理
- **Pointer Lock API**: 第一人称视角控制

## 🌍 浏览器兼容性

支持所有现代浏览器，需要WebGL支持：
- Chrome 51+
- Firefox 47+
- Safari 10+
- Edge 79+

## 🔍 故障排除

### 如果看到黑色圆柱：
- 确保通过HTTP服务器访问（不是直接打开文件）
- 检查图片文件是否存在
- 查看浏览器控制台错误信息

### 如果图片不显示：
- 确保图片文件名正确（1111.png, 2222.png）
- 检查图片格式是否为PNG
- 确保通过HTTPS访问（GitHub Pages）

### 如果控制不工作：
- 点击屏幕激活鼠标控制
- 确保浏览器支持Pointer Lock API
- 检查是否有其他程序占用鼠标

## 📝 更新日志

- **v1.0.0**: 初始版本，基本3D圆柱展示
- **v1.1.0**: 添加第一人称视角控制
- **v1.2.0**: 添加边界限制和跳跃功能
- **v1.3.0**: 优化图片翻转和高度适配

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- Three.js 团队提供的优秀3D库
- GitHub Pages 提供的免费托管服务 