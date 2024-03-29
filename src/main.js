import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/all.scss';
// 引入Bootstrap的JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from 'axios';
import VueAxios from 'vue-axios';

// 引入 VeeValidate 元件跟功能
import {
    Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
// 引入 VeeValidate 全部驗證規則
import AllRules from '@vee-validate/rules'
// 引入 VeeValidate 多國語系功能
import { localize, setLocale } from '@vee-validate/i18n'
// 引入 VeeValidate 繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// VeeValidation 表單驗證語法開始
// 定義規則(加入全部規則)(CDN版本)
Object.keys(AllRules).forEach(rule => {
    if (rule !== 'default') {
        defineRule(rule, AllRules[rule])
    }
})
// 加入 VeeValidate 繁體中文語系檔
// *將當前 VeeValidate 語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
    validateOnInput: true // 指欄位輸入內容時，會立即進行驗證（即邊寫邊判斷）
})

// *設定預設語系
setLocale('zh_TW')
// VeeValidation 表單驗證語法結束

const app = createApp(App)

// 註冊全域的表單驗證元件（VForm, VField, ErrorMessage）
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

// 建立 Pinia 實例
const pinia = createPinia();

// 使用 createApp 方法而創立的 app 實例
app.use(pinia);

app.use(router)


// axios 套件必須使用 vue3 版本。使用插件方式
app.use(VueAxios, axios)

app.mount('#app')
