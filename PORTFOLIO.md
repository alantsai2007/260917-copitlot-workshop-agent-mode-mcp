![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以簡潔的介面協助使用者新增、整理與完成日常事項，並將資料保存在瀏覽器中，適合直接離線開啟使用。

## 線上展示

[GitHub Pages](https://alantsai2007.github.io/260917-copitlot-workshop-agent-mode-mcp/)

> 請將上方網址中的帳號與 repository 名稱替換成實際的 GitHub Pages 網址。

## 功能

- 新增待辦事項，空白內容不會被加入清單。
- 勾選待辦事項為已完成，完成項目會顯示刪除線並淡化文字。
- 逐筆刪除待辦事項。
- 顯示所有待辦中的未完成項目數量。
- 清單沒有資料時顯示提示文字。
- 使用「全部」、「未完成」與「已完成」篩選清單。
- 篩選後沒有符合項目時顯示對應提示文字。
- 一次清除所有已完成項目，操作前會顯示確認對話框。
- 沒有已完成項目時，「清除已完成」按鈕會停用。
- 支援淺色與深色模式切換，並顯示對應圖示與文字。
- 使用者未手動設定主題時，會依照作業系統的深淺色偏好顯示。
- 將待辦資料與主題偏好保存至 `localStorage`，重新整理後仍可保留。
- 支援手機螢幕與響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用 React、Vue、jQuery、Bootstrap、Tailwind 等框架或套件。
- 不依賴外部 CDN，可直接離線開啟。
- 使用 CSS 變數管理主題配色。
- 使用 `localStorage` 保存待辦資料與主題偏好。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依照需求逐步建立待辦清單的介面與互動功能。
- 透過 MCP 連接 Microsoft Learn，查詢 `prefers-color-scheme` 與深色模式無障礙對比等官方文件，作為實作與檢查配色的參考。
- 透過 GitHub MCP 讀取 GitHub issue，將功能需求轉換成具體的修改計畫與實作工作。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義 agentic workflow，規範讀取 issue、提出計畫、建立分支、修改、驗證、提交推送與建立 Pull Request 的流程。

## 我學到什麼

- 如何使用 Agent Mode 將自然語言需求拆解成可執行的前端開發步驟。
- 如何使用 MCP 取得 Microsoft Learn 與 GitHub 的外部資訊，協助理解文件與 issue。
- 如何透過 `localStorage` 保存瀏覽器端資料，讓頁面重新整理後維持使用狀態。
- 如何使用 CSS 變數與主題狀態實作淺色、深色模式，並注意色彩對比與可讀性。
- 如何用 prompt 定義可重複的 agentic workflow，從 issue 需求一路完成分支、修復與 Pull Request。
