// 取出 Pinia 裡的 defineStore 方法
import { defineStore } from 'pinia'

// 寫法1和2是將定義好的 store 賦值給變數 useAdminLoginStore。適用於多個地方引用同一個 store 實例情況，可以在多個文件中引用 useAdminLoginStore 變數
// useAdminLoginStore 是自行定義 Pinia store 的函數，之後可以通過調用它來取得 store 實例
// 寫法1
export const useAdminLoginStore = defineStore({
    // id 是定義 Store 名稱(唯一性)
    id: 'myStore',
    state: () => ({
        // 先定義 name 為一個空字串做默認值
        name: '',
        email: '',
        id: 0,
    }),
    // actions 概念同 Vue 的 methods
    // 透過呼叫將 response 存到 state 中，所以 actions 可以用來更新 state 資料的方法
    actions: {
        updateName(newName) {
            this.name = newName;
        },
        updateEmail(newEmail) {
            this.email = newEmail;
        },
        updateId(newId) {
            this.id = newId;
        }
    },
})

// // // 寫法2
// const useAdminLoginStore = defineStore('myStore', {
//     state: () => ({
//         // 先定義 name 為一個空字串做默認值
//         name: '',
//         email: '',
//         id: 0,
//     }),
//     // actions 概念同 Vue 的 methods
//     // 透過呼叫將 response 存到 state 中，所以 actions 可以用來更新 state 資料的方法
//     actions: {
//         updateName(newName) {
//             this.name = newName;
//         },
//         updateEmail(newEmail) {
//             this.email = newEmail;
//         },
//         updateId(newId) {
//            this.id = newId;
//         }
//     },
// })

// export { useAdminLoginStore };

// 寫法3(六角學院)。默認導出 store。默認就不需要將其賦值給一個變數。適用於只導出一個 store 情況。可以直接在其他文件中導入這個 store 並使用，不需要額外的變數來引用。
// export default defineStore('myStore', {
//     state: () => ({
//         // 先定義 name 為一個空字串做默認值
//         name: '',
//         email: '',
//         id: 0,
//     }),
//     // actions 概念同 Vue 的 methods
//     // 透過呼叫將 response 存到 state 中，所以 actions 是可以來更新 state 資料的方法
//     actions: {
//         updateName(newName) {
//             this.name = newName;
//         },
//         updateEmail(newEmail) {
//             this.email = newEmail;
//         },
//         updateId(newId) {
//            this.id = newId;
//         }
//     },
// })