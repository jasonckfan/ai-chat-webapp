# AI Chat Web App

一個類似 ChatGPT 的現代化 AI 對話界面，使用 React + TypeScript + Tailwind CSS 開發。

## 功能特點

- 🤖 簡潔的對話界面
- 🌓 深色/淺色主題切換
- 📝 Markdown 渲染支援
- 💻 代碼高亮顯示
- 📱 響應式設計
- ⚡ 快速載入

## 技術棧

- **前端**: React 18 + TypeScript
- **樣式**: Tailwind CSS 4
- **UI 組件**: Lucide React
- **Markdown**: react-markdown
- **代碼高亮**: react-syntax-highlighter
- **構建工具**: Vite

## 安裝與運行

```bash
# 進入項目目錄
cd frontend

# 安裝依賴
npm install

# 開發模式運行
npm run dev

# 構建生產版本
npm run build
```

## 使用方法

1. 在輸入框輸入訊息
2. 按 Enter 或點擊發送按鈕
3. 支援 Markdown 語法和代碼塊
4. 點擊右上角圖標切換主題

## 連接真實 AI API

目前使用模擬回應。要連接真實 API，請修改 `App.tsx` 中的 `handleSend` 函數：

```typescript
const handleSend = async () => {
  // ... 現有代碼 ...
  
  // 替換為真實 API 調用
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  
  const data = await response.json();
  // 處理回應...
}
```

## 開發團隊

由 Hermes Agent Team 開發：
- Creative Director: 設計方向
- Coder: 技術實現
- QA: 品質驗證

---

*最後更新: 2026-04-17*
