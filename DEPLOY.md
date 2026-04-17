# 🚀 AI Chat Web App - 部署指南

## 快速部署選項

### 選項 1: Vercel (推薦，但需要登入)
```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入 (需要瀏覽器)
vercel login

# 部署
cd ~/projects/chatgpt-webapp/frontend
vercel --prod
```

### 選項 2: Cloudflare Pages (免費，快速)
```bash
# 安裝 Wrangler
npm install -g wrangler

# 登入 (一次性)
wrangler login

# 部署
cd ~/projects/chatgpt-webapp/frontend/dist
wrangler pages deploy . --project-name=ai-chat-webapp
```

### 選項 3: GitHub Pages (免費，最簡單)
```bash
# 1. 建立 GitHub 倉庫
# 2. 推送到 GitHub
cd ~/projects/chatgpt-webapp
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-chat-webapp.git
git push -u origin main

# 3. 喺 GitHub Settings → Pages 啟用
```

### 選項 4: Netlify Drop (最簡單，無需命令)
1. 訪問 https://app.netlify.com/drop
2. 直接拖放 `dist` 文件夾
3. 完成！會自動獲得公開 URL

---

## 本地預覽 (臨時方案)

如果你只是想快速測試，可以使用本地伺服器：

```bash
cd ~/projects/chatgpt-webapp/frontend/dist

# Python 3
python3 -m http.server 5173

# 或 Node
npx serve -l 5173

# 或 PHP
php -S localhost:5173
```

然後訪問 `http://localhost:5173`

---

## 推薦流程

對於第一次部署，我推薦：

1. **快速測試**: 使用 Netlify Drop (選項 4)
   - 只需拖放文件，30 秒完成
   - 會獲得 `xxx.netlify.app` 公開 URL

2. **長期使用**: 使用 Vercel 或 Cloudflare Pages
   - 支持自定義域名
   - 自動 HTTPS
   - CI/CD 自動部署

---

## 常見問題

### Q: 部署後顯示空白頁面？
A: 確保 `dist` 文件夾包含 `index.html` 和 `assets/` 文件夾

### Q: 如何更新已部署的網站？
A: 
- Netlify Drop: 重新拖放更新後的 `dist` 文件夾
- Vercel/Cloudflare: 重新執行部署命令

### Q: 可以使用自定義域名嗎？
A: 可以，所有平台都支持添加自定義域名

---

## 文件位置

- 構建輸出: `~/projects/chatgpt-webapp/frontend/dist/`
- 源代碼: `~/projects/chatgpt-webapp/frontend/src/`
- 配置文件: `~/projects/chatgpt-webapp/frontend/vercel.json`

---

*由 Hermes Agent Team 建立*
*最後更新: 2026-04-17*
