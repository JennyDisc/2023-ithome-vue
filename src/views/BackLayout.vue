<template>
  <div class="container">
    <div class="row backBlock">
      <div class="col"></div>
      <div class="col-4 my-auto">
        <v-form id="form" ref="form" v-slot="{ errors }" @submit="submitOrder" class="me-4">
          <h1 class="mb-4 text-center text-danger">華特集團管理頁面</h1>
          <p class="mb-4 fs-4 text-center">歡迎管理者</p>
          <div class="mb-3">
            <v-field
              type="text"
              name="email"
              placeholder="請輸入電子郵件"
              class="px-3 pe-4 py-2 form-control"
              rules="required|email"
              v-model="email"
              :class="{ 'is-invalid': errors.email }"
            ></v-field>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
          </div>
          <div class="mb-4">
            <v-field
              type="password"
              name="密碼"
              placeholder="請輸入密碼"
              class="px-3 pe-4 py-2 form-control"
              :rules="isPassword"
              v-model="password"
              :class="{ 'is-invalid': errors.密碼 }"
            ></v-field>
            <error-message name="密碼" class="invalid-feedback"></error-message>
          </div>
          <button class="btn btn-lg btn-info w-100 mb-4" type="submit">
            登入
          </button>
        </v-form>
      </div>
      <div class="col-4 my-auto">
        <img
          src="https://images.unsplash.com/photo-1630091003936-aea522c1e8c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          class="img-fluid"
          alt="管理首頁畫面圖"
        />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// 寫法1和2(定義好的 store 賦值給變數 useAdminLoginStore)
// 在元件中引入並呼叫 useAdminLoginStore() 來訪問 store
import { useAdminLoginStore } from "../components/AdminLoginStore.js";

// 寫法3(默認導出 store)
// 在其他 Vue 文件中導入默認導出的 store，使用時要取名
// import useAdminLoginStore from "../components/AdminLoginStore.js";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      id: 0,
    };
  },
  methods: {
    // 自訂驗證規則-密碼需含大小寫英文字母
    isPassword(value) {
      const passwordNumber = /^(?=.*[a-z])(?=.*[A-Z])/;
      return passwordNumber.test(value) ? true : "密碼 需含大小寫英文字母";
    },
    // 表單送出按鈕
    submitOrder() {
      // 使用 Vee Validate 的 validate 函式來驗證表單
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          // 驗證通過，可以提交表單
          const apiAdminUrl = `http://localhost:3003/admin?email=${this.email}&password=${this.password}`;
          axios
            .get(apiAdminUrl)
            .then((res) => {
              console.log(res);

              // 法1、2、3
              // 假設網路請求成功取得資料集
              // 變數 newName 指資料集裡的第一個物件值
              const newName = res.data[0];
              // // // 令 data() 裡的 name 為資料集的 name
              this.name = newName.name;
              this.email = newName.email;
              this.id = newName.id;

              // // 使用 Pinia 中的 updateUser action 更新 store 裡的 state 資料

              // // (1)訪問 store 中的狀態和執行。這寫法是直接在方法中取得 store 實例(adminStore)
              const adminStore = useAdminLoginStore();
              // // (2)操作這實例(userStore)去調用 updateName ，將 axios.get 取得的 newName.name 更新到 store 的 name 狀態中
              adminStore.updateName(newName.name);
              adminStore.updateEmail(newName.email);
              adminStore.updateId(newName.id);

              // 印出來看 newName.name 值
              // console.log("admin data updated:", newName.name);
              console.log(
                "admin data updated:",
                newName.name,
                newName.email,
                newName.id
              );

              // 法4(不用pinia store)
              // localStorage.setItem("admin-info",JSON.stringify(res.data))

              alert("登入成功");
              // 網路請求成功後清空表單欄位(初始化)
              this.$refs.form.resetForm();
              // 路由轉址(轉跳到指定頁面)。用$router方法集的push
              this.$router.push("/adminlogin/main");
            })
            .catch((error) => {
              console.log(error);
              alert("資料尚未建檔，請與資訊處聯繫!");
            });
        } else {
          // 驗證不通過不予提交並顯示錯誤訊息
          alert("請再次確認登入資料後提交");
        }
      });
    },
  },
};
</script>
