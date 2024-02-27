## 一、作品說明
參加 2023 年 iThome 鐵人賽 Vue.js 類別，建立「試試用Vue建立網站吧」系列文章挑戰連續 30 天每天發 1 篇技術文的競賽。

透過參賽複習 Vue 技術。以虛擬集團餐廳會員網站為主題，網站提供集團會員紀錄喜愛的旗下餐廳與評論，頁面內容有前（具響應式網頁特性）、後台頁面。練習使用框架進行開發，並加入 Pinia 跨元件狀態管理工具將元件統一管理。作品中使用 json-server 套件模擬前端開發時（尚未有後端技術支援）能讓前端開發測試用的 API 情境。

### -前台功能
(1)口袋餐廳：提供會員建立喜愛的集團餐飲品牌清單（即口袋餐廳）。會員具有新增與移除列表項目的權限。
(2)餐廳實評：根據口袋餐廳建立的清單，對此填寫用餐體驗。會員具有新增與修改評論的權限。

＊請以該組帳號登入
    e-mail：test@gmail.com
    password：Test

### -後台功能
(1)管理者具有新增餐廳的權限。現有前端技術僅支持簡單的 API 建立，無法進行後端邏輯 API 的開發。因此後台管理模板無法提供對現有餐廳資料做修改和移除功能。

＊請以該組帳號進行登入
    e-mail：boss@gmail.com
    password：Boss123

## 二、開發工具介紹
- 作業系統：Windows 11（64 bit）
- 開發工具：Visual Studio（版本 1.82.10）
- JavaScript 框架：Vue 3（Options API 寫法）
  - 套件：axios、vee-validate
- Vue3 建構工具（預處理器）：Vite （ Node.js 版本 18.17.1 ）
  - 套件：pinia
- 切版框架：Bootstrap 5
  - CSS 預處理器：SCSS
- 後端 Node.js 
  - json-server 本地端建立虛擬 REST API 伺服器

## 三、專案資料夾架構
```
├── public                     # 包含專案程式的靜態資源，如圖像。
├── src                          # 專案的主要的開發檔案。
│   ├── assets/              # 包含應用程式的靜態資源，如圖像、字體等。
│            └── base/       # 定義常用的HTML元素初始設定。
│            └── layout/    # 針對各分頁中重複區塊進行樣式定義。
│            └── pages/     # 專案程式的頁面檔案，對主頁或各分頁做樣式設定。
│            └── untils/     # 匯入其他scss檔案中的工具如變數、自行定義的字型樣式、間距。
│   ├── components/   # 專案程式中可重複使用元件或Pinia Store。
│   ├── router/             # 建立專案程式的路由表，讓系統能透過路徑去管控要執行哪個頁面裡的哪個元件。
│   ├── views/             # 專案程式的頁面元件，用於建立不同的頁面。
│   ├── App.vue          # 專案程式的主應用程式元件，也可以說是整個網頁的根元件。
│   ├── main.js            # 專案的程式進入點，所有檔案都需要跟main.js 有關連性才能被正確編譯。
├── index.html            # 專案程式的主要HTML文件，內容對應載入JavaScript的main.js檔案和渲染應用程式。
├── package.json        # 專案的npm套件管理檔案。
├── README.md      # 說明專案與運行的文件。
└── vite.config.js        # Vite的設定檔案，用於配置建置工具Vite的行為（包含專案編譯路徑設定）。
```

## 四、執行專案
```
npm install   #依照 vite 專案中 package.json 檔案內的項目進行安裝

#執行 根目錄\public\db\start_servers.bat 的 bat 批次檔案，在本地端啟動 JSON API 伺服器。一定要在啟動 JSON API 伺服器下，網站才能連上(執行)這個 API !!!

npm run dev   #執行 vite 專案
```

## 五、數據資料來源
- 自行定義

## 六、相關網站連結
- 2023 年 iThome 鐵人賽（第15屆）
  - 官網
    - https://ithelp.ithome.com.tw/2023ironman/event
  - 「試試用Vue建立網站吧」系列文章
    - https://ithelp.ithome.com.tw/users/20151272/ironman/6829

## 七、設計稿資訊
- 自行設計
