<template>
  <div class="container">
    <FrontNavbar />
    <div class="row">
      <div class="col">
        <!-- 法1、2、3 -->
        <p class="fw-bold text-capitalize text-primary">
          歡迎華特會員 {{ userName }}
        </p>
        <!-- 法4(不用pinia store) -->
        <!-- <p class="fs-4 fw-bold text-capitalize text-primary">
      歡迎華特會員 {{ userInfo && userInfoName }}
    </p> -->
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 mb-3 mb-lg-0">
        <ul>
          <li class="mb-4">口袋餐廳：提供會員建立喜愛的集團餐飲品牌清單（稱為口袋餐廳）。會員具有新增與移除列表項目的權限。</li>
          <li>餐廳實評：根據口袋餐廳建立的清單，提供會員對其紀錄實際用餐體驗。會員具有新增與修改評論的權限。</li>
        </ul>
      </div>
      <div class="col-lg-6">
        <img
          src="https://media.istockphoto.com/id/1317988317/photo/close-up-of-young-asian-female-small-business-owner-in-apron-starting-her-business-day.jpg?s=2048x2048&w=is&k=20&c=OheXOulCM-Kc36YrO84f-Gm5iF6ElcBsPq3A_GZ4d8k="
          alt="主頁預設圖案"
          class="mx-auto img-fluid"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FrontNavbar from '../front/FrontNavbar.vue';
// 法1、2、3
import { mapState } from "pinia";

// 寫法1和2(定義好的 store 賦值給變數 useLoginStore)
// 在元件中引入並呼叫 useLoginStore() 來訪問 store
import { useLoginStore } from "../../components/LoginStore.js";

// 寫法3(默認導出 store)
// 在其他 Vue 文件中導入默認導出的 store，使用時要取名
// import useLoginStore from "../../components/LoginStore.js";

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
  //     userInfo: null, // 先初始化定義為 null
  //     userInfoName:null, // 先初始化定義為 null
  //   };
  // },

  components: {
    // 註冊引入的組件
    FrontNavbar 
  },

  // 法1、2、3
  computed: {
    ...mapState(useLoginStore, {
      // 'name' 是 store 中的狀態名，'userName' 是在組件中的名稱
      userName: (state) => state.name,
    }),
  },

  // 法4(不用pinia store)
  // created 是初始化執行(html模板渲染之前)
  // created() {
  //   const userInfoString = localStorage.getItem("user-info");
  //   // 檢查 user-info 是否存在，存在才執行
  //   if (userInfoString) {
  //     this.userInfo = JSON.parse(userInfoString);
  //     this.userInfoName=(this.userInfo[0]?.name);
  //     console.log(this.userInfoName);
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
