<template>
  <div class="container">
    <div class="row row-front">
      <div class="col"></div>
      <div class="d-none d-lg-block col-lg-4">
        <img
          src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
          class="img-fluid login-img"
          alt="首頁畫面圖"
        />
      </div>
      <div class="col-3 my-lg-auto front-form">
        <v-form
          id="form"
          ref="form"
          v-slot="{ errors }"
          @submit="submitOrder"
          class="pt-5 pt-lg-0"
        >
          <h1 class="mb-4 text-center">華特義式餐廳</h1>
          <div class="mb-3">
            <v-field
              type="text"
              name="會員名稱"
              placeholder="請輸入會員名稱"
              class="px-3 pe-4 py-2 form-control"
              rules="required"
              v-model="name"
              :class="{ 'is-invalid': errors['會員名稱'] }"
            ></v-field>
            <error-message
              name="會員名稱"
              class="invalid-feedback"
            ></error-message>
          </div>
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
          <button class="btn btn-lg btn-primary w-100 mb-4" type="submit">
            註冊
          </button>
        </v-form>
        <div class="text-end login-buttom">
          <RouterLink to="/login">已是會員，請按此登入</RouterLink>
        </div>
      </div>
      <div class="col"></div>
      <div class="text-end login-buttom">
        <RouterLink to="/adminlogin">點此進入後台管理</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
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
          axios
            .get(`http://localhost:3000/user?email=${this.email}`)
            .then((res) => {
              if (res.data && res.data.length > 0) {
                alert("該電子郵件已註冊過，請直接登入");
                // 網路請求成功後清空表單欄位(初始化)
                this.$refs.form.resetForm();
                // 路由轉址(轉跳到指定頁面)。用$router方法集的push
                this.$router.push("/login");
              } else {
                axios
                  .post("http://localhost:3000/user", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                  })
                  .then((res) => {
                    console.log(res);
                    alert("註冊成功");
                    // 網路請求成功後清空表單欄位(初始化)
                    this.$refs.form.resetForm();
                    // 路由轉址(轉跳到指定頁面)。用$router方法集的push
                    this.$router.push("/login");
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("註冊失敗");
                  });
              }
            });
        } else {
          // 驗證不通過不予提交並顯示錯誤訊息
          alert("請確實填寫資料後提交");
        }
      });
    },
  },
};
</script>
