#!/bin/bash
# WSL Web App 外部訪問配置腳本
# 由 System Admin 建立

echo "🚀 WSL Web App 外部訪問配置"
echo "=========================="
echo ""

# 獲取 WSL IP
WSL_IP=$(hostname -I | awk '{print $1}')
echo "📍 WSL IP: $WSL_IP"
echo ""

# 檢查是否已經構建
if [ ! -d "dist" ]; then
    echo "🔨 構建生產版本..."
    npm run build
fi

echo ""
echo "💡 請選擇訪問方式:"
echo ""
echo "1️⃣  方案 A: 使用 Python HTTP 伺服器 (簡單)"
echo "    命令: python3 -m http.server 5173 --directory dist"
echo "    訪問: http://$WSL_IP:5173"
echo ""
echo "2️⃣  方案 B: 使用 Node serve (需要安裝)"
echo "    命令: npx serve -s dist -l 5173"
echo "    訪問: http://$WSL_IP:5173"
echo ""
echo "3️⃣  方案 C: Windows 端口轉發 (推薦用於外部設備)"
echo "    請喺 Windows PowerShell (管理員) 執行:"
echo "    netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=$WSL_IP"
echo "    netsh advfirewall firewall add rule name=\"WSL2 WebApp\" dir=in action=allow protocol=tcp localport=5173"
echo ""
echo "4️⃣  方案 D: 部署到 Vercel (推薦長期使用)"
echo "    命令: npx vercel --prod"
echo ""

read -p "請選擇 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 啟動 Python HTTP 伺服器..."
        echo "   訪問地址: http://$WSL_IP:5173"
        echo "   按 Ctrl+C 停止"
        echo ""
        cd dist && python3 -m http.server 5173
        ;;
    2)
        echo ""
        echo "🚀 啟動 Node serve..."
        echo "   訪問地址: http://$WSL_IP:5173"
        echo "   按 Ctrl+C 停止"
        echo ""
        npx serve -s dist -l 5173
        ;;
    3)
        echo ""
        echo "📋 Windows 端口轉發指令:"
        echo "   請喺 Windows PowerShell (管理員) 執行:"
        echo ""
        echo "   netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=$WSL_IP"
        echo "   netsh advfirewall firewall add rule name=\"WSL2 WebApp\" dir=in action=allow protocol=tcp localport=5173"
        echo ""
        echo "   然後用 Windows IP 訪問: http://<WINDOWS_IP>:5173"
        ;;
    4)
        echo ""
        echo "🚀 部署到 Vercel..."
        npx vercel --prod
        ;;
    *)
        echo "無效選擇"
        exit 1
        ;;
esac
