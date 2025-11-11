@echo off
chcp 65001
echo ========================================
echo 开始推送到GitHub
echo ========================================
echo.

echo [1/7] 初始化Git仓库...
git init
if errorlevel 1 (
    echo 错误：Git初始化失败！
    pause
    exit /b 1
)
echo ✓ Git仓库初始化成功
echo.

echo [2/7] 添加所有文件...
git add .
if errorlevel 1 (
    echo 错误：添加文件失败！
    pause
    exit /b 1
)
echo ✓ 文件添加成功
echo.

echo [3/7] 创建首次提交...
git commit -m "初始提交：打车小程序完整版本（含地址搜索、距离计算、价格计算等功能）"
if errorlevel 1 (
    echo 错误：提交失败！
    pause
    exit /b 1
)
echo ✓ 提交成功
echo.

echo [4/7] 设置主分支为main...
git branch -M main
if errorlevel 1 (
    echo 错误：分支重命名失败！
    pause
    exit /b 1
)
echo ✓ 分支设置成功
echo.

echo [5/7] 添加远程仓库...
git remote add origin https://github.com/summerpromise/wxss.git
if errorlevel 1 (
    echo 注意：远程仓库可能已存在，尝试更新...
    git remote set-url origin https://github.com/summerpromise/wxss.git
)
echo ✓ 远程仓库配置成功
echo.

echo [6/7] 推送到GitHub...
echo 注意：首次推送可能需要登录GitHub
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo 错误：推送失败！
    echo.
    echo 可能的原因：
    echo 1. 需要GitHub身份验证
    echo 2. 网络连接问题
    echo 3. 远程仓库已有内容
    echo.
    echo 如果需要强制推送（会覆盖远程内容），请运行：
    echo git push -u origin main --force
    echo.
    pause
    exit /b 1
)
echo.

echo ========================================
echo ✓ 推送成功！
echo ========================================
echo.
echo 您的代码已成功推送到：
echo https://github.com/summerpromise/wxss
echo.
pause

