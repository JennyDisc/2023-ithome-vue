<template>
  <div class="container">
    <BackNavbar />
    <div class="row">
      <div class="col">
        <!-- 法1、2、3 -->
        <p class="fs-4 fw-bold text-capitalize text-success">
          歡迎華特集團管理者 {{ userName }}
        </p>
        <!-- 法4(不用pinia store) -->
        <!-- <p class="fs-4 fw-bold text-capitalize text-primary">
        歡迎華特集團管理者 {{ userInfo && userInfoName }}
      </p> -->
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 mb-3 mb-lg-0">
        <ul>
          <li class="mb-4">
            管理餐廳列表：管理者具有新增與移除集團餐廳的權限。
          </li>
        </ul>
      </div>
      <div class="col-lg-6">
        <img
          src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="管理主頁預設圖案"
          class="page-img mx-auto img-fluid"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BackNavbar from "../admin/BackNavbar.vue";
// 法1、2、3
import { mapState } from "pinia";

// 寫法1和2(定義好的 store 賦值給變數 useAdminLoginStore)
// 在元件中引入並呼叫 useAdminLoginStore() 來訪問 store
import { useAdminLoginStore } from "../../components/AdminLoginStore.js";

// 寫法3(默認導出 store)
// 在其他 Vue 文件中導入默認導出的 store，使用時要取名
// import useAdminLoginStore from "../../components/AdminLoginStore.js";

export default {
  // 法1、2、3。這裡透過 mapState 取用 pinia store資料，所以不用在 data 中再聲明相同的數據(即下面data()這段不用寫)
  // data() {
  //   return {
  //     name: "",
  //   };
  // },

  // 法4(不用pinia store)
  // data() {
  //   return {
  //     adminInfo: null, // 先初始化定義為 null
  //     adminInfoName:null, // 先初始化定義為 null
  //   };
  // },
  components: {
    // 註冊引入的組件
    BackNavbar,
  },
  // 法1、2、3
  computed: {
    ...mapState(useAdminLoginStore, {
      // 'name' 是 store 中的狀態名，'userName' 是在組件中的名稱
      userName: (state) => state.name,
    }),
  },

  // 法4(不用pinia store)
  // created 是初始化執行(html模板渲染之前)
  // created() {
  //   const adminInfoString = localStorage.getItem("admin-info");
  //   // 檢查 admin-info 是否存在，存在才執行
  //   if (adminInfoString) {
  //     this.adminInfo = JSON.parse(adminInfoString);
  //     this.adminInfoName=(this.adminInfo[0]?.name);
  //     console.log(this.adminInfoName);
  //   }
  // },
  methods: {
    // 法4
    // logout() {
    //   localStorage.clear();
    // },
  },
};
</script>
