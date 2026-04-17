# Vercel 手動部署指南

## 方法一：使用 Vercel CLI (推薦)

### 步驟 1: 安裝 Vercel CLI
```bash
npm install -g vercel
```

### 步驟 2: 登入 Vercel
```bash
vercel login
```
- 會打開瀏覽器，請按指示登入

### 步驟 3: 進入項目目錄
```bash
cd ~/projects/chatgpt-webapp/frontend
```

### 步驟 4: 執行部署
```bash
vercel --prod
```

### 步驟 5: 跟隨提示
- 如果問 "Set up and deploy?"，輸入 `Y`
- 如果問 "Which scope?"，選擇你的帳戶
- 如果問 "Link to existing project?"，輸入 `N` (新項目)
- 輸入項目名稱，例如 `ai-chat-webapp`

### 步驟 6: 完成！
Vercel 會提供一個公開 URL，例如：
```
https://ai-chat-webapp-xxx.vercel.app
```

---

## 方法二：使用 Git + Vercel Dashboard

### 步驟 1: 建立 Git 倉庫
```bash
cd ~/projects/chatgpt-webapp
git init
git add .
git commit -m "Initial commit"
```

### 步驟 2: 推送到 GitHub
```bash
# 喺 GitHub 建立新倉庫，然後:
git remote add origin https://github.com/YOUR_USERNAME/ai-chat-webapp.git
git push -u origin main
```

### 步驟 3: 喺 Vercel Dashboard 導入
1. 訪問 https://vercel.com/new
2. 選擇你的 GitHub 倉庫
3. 配置：
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 點擊 "Deploy"

---

## 方法三：使用 Vercel Token (CI/CD)

### 步驟 1: 獲取 Token
1. 訪問 https://vercel.com/account/tokens
2. 點擊 "Create Token"
3. 複製 Token

### 步驟 2: 使用 Token 部署
```bash
cd ~/projects/chatgpt-webapp/frontend
vercel --token YOUR_TOKEN --prod
```

---

## 部署後

- **公開 URL**: Vercel 會自動分配一個 `.vercel.app` 域名
- **自定義域名**: 可以喺 Vercel Dashboard 添加
- **自動部署**: 每次推送到 GitHub 會自動重新部署

---

## 故障排除

### 問題: "Command "vercel" not found"
**解決**: 確保全局安裝 `npm install -g vercel`

### 問題: "Error! No existing credentials found"
**解決**: 執行 `vercel login` 先登入

### 問題: 部署成功但顯示空白頁面
**解決**: 檢查 `vercel.json` 配置是否正確

---

*由 Hermes Agent Team 建立*
