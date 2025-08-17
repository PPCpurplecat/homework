@echo off
chcp 65001 >nul

echo 🚀 开始部署到GitHub Pages...

REM 检查Git是否初始化
if not exist ".git" (
    echo 📁 初始化Git仓库...
    git init
)

REM 添加所有文件
echo 📦 添加文件到Git...
git add .

REM 提交更改
echo 💾 提交更改...
git commit -m "Update 3D cylinder gallery"

REM 设置主分支名称
echo 🌿 设置主分支...
git branch -M main

REM 检查远程仓库
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  请先添加远程仓库：
    echo git remote add origin https://github.com/你的用户名/仓库名.git
    echo 然后运行：git push -u origin main
) else (
    echo 🚀 推送到GitHub...
    git push origin main
)

echo ✅ 部署完成！
echo 🌐 访问你的网站：https://你的用户名.github.io/仓库名/
echo.
echo 📋 下一步：
echo 1. 进入GitHub仓库设置
echo 2. 找到 'Pages' 选项
echo 3. 选择 'Deploy from a branch'
echo 4. 选择 'main' 分支和 '/' 文件夹
echo 5. 点击 'Save'

pause 