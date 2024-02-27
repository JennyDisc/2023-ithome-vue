<template>
  <div class="container">
    <FrontNavbar />
    <section>
      <div class="row mb-4">
        <div class="col-4">
          <h1>餐廳實評</h1>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-4 d-none d-lg-block">
          <img
            src="https://plus.unsplash.com/premium_photo-1671493286864-f354f3d2feb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="關於喜愛的圖"
            class="img-fluid comment-img"
          />
        </div>
        <div class="col-lg"></div>
        <div class="col col-lg-4">
          <form>
            <div class="row g-2 mb-4">
              <label for="type" class="col-sm-3 col-form-label">品牌受眾</label>
              <input
                type="text"
                id="type"
                class="form-control col-sm"
                :placeholder="selectCardList.cardType"
                disabled
              />
            </div>
            <div class="row g-2 mb-4">
              <label for="res-name" class="col-sm-3 col-form-label"
                >品牌名稱</label
              >
              <input
                type="text"
                id="res-name"
                class="form-control col-sm"
                :placeholder="selectCardList.cardBrandName"
                disabled
              />
            </div>
            <div class="row g-2 mb-4">
              <label for="address" class="col-sm-3 col-form-label">地址</label>
              <input
                type="text"
                id="address"
                class="form-control col-sm"
                :placeholder="selectCardList.cardAddress"
                disabled
              />
            </div>
            <div class="row g-2 mb-4">
              <label
                for="exampleFormControlTextarea1"
                class="col-sm-3 col-form-label"
                >餐廳評論</label
              >
              <textarea
                class="form-control col-sm"
                id="exampleFormControlTextarea1"
                rows="6"
                :disabled="commentDisabled"
                v-model="selectCardList.cardComment"
              ></textarea>
            </div>
            <!-- 有移除評論架構 -->
            <div class="d-flex justify-content-end mb-4">
              <button
                class="btn btn-lg btn-danger me-4"
                type="submit"
                @click="delComment()"
              >
                移除評論
              </button>
              <button
                class="btn btn-lg btn-primary"
                type="submit"
                @click="submitComment()"
              >
                提交評論
              </button>
            </div>

            <!-- 沒有移除評論架構 -->
            <!-- <div class="d-flex justify-content-end">
            <button
              class="btn btn-lg btn-primary mb-4"
              type="submit"
              @click="submitComment()"
            >
              提交評論
            </button>
          </div> -->
          </form>
        </div>
      </div>
    </section>
    <section class="row">
      <div
        class="col-lg-3 mb-4"
        v-for="(item, index) in userResList"
        v-bind:key="item"
      >
        <a class="comment-card" @click="selectCard(item)">
          <div class="card">
            <!-- 會員餐廳API有評論，卡片.card-header就標註其他顏色 -->
            <h2 class="card-header" :data-index="index">
              {{ item.type }}
            </h2>
            <div class="card-body">
              <h3 class="card-title">{{ item.brandName }}</h3>
              <p class="card-text">{{ item.address }}</p>
              <p>
                <button
                  class="btn btn-warning"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapseExample' + index"
                  aria-expanded="false"
                  :aria-controls="'collapseExample' + index"
                >
                  查看實評
                </button>
              </p>
              <div class="collapse" :id="'collapseExample' + index">
                <div class="card card-body">
                  {{ item.comment }}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import FrontNavbar from "../front/FrontNavbar.vue";
import axios from "axios";
// 法1、2、3
import { mapState } from "pinia";

// 寫法1和2(定義好的 store 賦值給變數 useLoginStore)
// 在元件中引入並呼叫 useLoginStore() 來訪問 store
import { useLoginStore } from "../../components/LoginStore.js";

// 寫法3(默認導出 store)
// 在其他 Vue 文件中導入默認導出的 store，使用時要取名
// import useLoginStore from "../../components/LoginStore.js";

export default {
  data() {
    return {
      // 原始 API 抓来未排序的資料
      userResList: [],
      // 會員選的卡片其「品牌受眾」、「品牌名稱」、「地址」的項目值放在 selectCardList 裡相應的屬性中
      selectCardList: {
        cardBrandName: "",
        cardType: "",
        cardAddress: "",
        cardComment: "",
      },
      // 控制餐廳評論是否可以操作。true不可操作
      commentDisabled: true,

      // 法1、2、3、4
      // axios的url初始化為空字符串，稍後在 created() 中設置
      apiUserResUrl: "",
      apiUserResIdUrl: "",

      // 法4(不用pinia store)
      // userInfo: null, // 先初始化定義為 null
      // userInfoName: null, // 先初始化定義為 null
      // userInfoEmail: null,
      // userInfoId: 0,
    };
  },
  components: {
    // 註冊引入的組件
    FrontNavbar,
  },
  methods: {
    userPocket() {
      axios
        .get(this.apiUserResUrl)
        .then((res) => {
          console.log(res);
          this.userResList = res.data[0].userRestaurants;
          console.log(this.userResList);

          // 待DOM元素被完全渲染完再執行
          setTimeout(() => {
            // 在獲取數據後遍歷數據，根據comment字段展開折疊區塊
            // 判斷api中comment欄位是否為空。trim()是消除句首尾空白
            this.userResList.forEach((item, index) => {
              if (item.comment && item.comment.trim() !== "") {
                // 法1
                // 更新按鈕的aria-expanded屬性
                const buttonElement = document.querySelector(
                  `[data-bs-target="#collapseExample${index}"]`
                );
                if (buttonElement) {
                  buttonElement.setAttribute("aria-expanded", "true");
                }

                // 更新折疊區塊的class屬性
                const collapseElement = document.querySelector(
                  `#collapseExample${index}`
                );
                if (collapseElement) {
                  collapseElement.classList.add("show");
                }

                // 卡片表頭的class增加comment-color
                const h2Element = document.querySelector(
                  `[data-index="${index}"]`
                );

                if (h2Element) {
                  h2Element.classList.add("comment-color");
                }

                // 法2
                // const collapseId = "collapseExample" + index;
                // console.log(collapseId);
                // // 印出 collapseExample0 或 collapseExample1 ...

                // const buttonElement = document.querySelector(
                //   '[data-bs-target="#' + collapseId + '"]'
                // );

                // if (buttonElement) {
                //   buttonElement.setAttribute("aria-expanded", "true");
                // }

                // // 更新折疊區塊的class屬性
                // const collapseElement = document.querySelector(
                //   "#" + collapseId
                // );

                // if (collapseElement) {
                //   collapseElement.setAttribute("class", "collapse show");
                // }

                // // 卡片表頭的class增加comment-color
                // const h2Element = document.querySelector(`[data-index="${index}"]`);

                // if (h2Element) {
                //   h2Element.classList.add("comment-color");
                // }
              }
            }, 100);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetTable() {
      this.selectCardList.cardBrandName = "";
      this.selectCardList.cardType = "";
      this.selectCardList.cardAddress = "";
      this.selectCardList.cardComment = "";
      // 表單提交後讓關閉對餐廳評論的操作
      this.commentDisabled = true;
    },
    selectCard(item) {
      // 允許對餐廳評論操作
      this.commentDisabled = false;
      this.selectCardList.cardBrandName = item.brandName;
      this.selectCardList.cardType = item.type;
      this.selectCardList.cardAddress = item.address;

      if (item.comment) {
        this.selectCardList.cardComment = item.comment;
      } else {
        // 將上一次選擇的卡片評論給重置
        this.selectCardList.cardComment = "";
      }
    },
    submitComment() {
      event.preventDefault(); // 禁止按鈕提交的默認行為

      // 餐廳評論欄位必須有值才可提交表單
      if (this.selectCardList.cardComment !== "") {
        axios
          .get(this.apiUserResUrl)
          .then((res) => {
            console.log(res);

            // res.data是陣列要變成物件後面才能用push，所以取第一個內容(這裡是物件)
            const userData = res.data[0];
            console.log(userData);

            const dataIndex = userData.userRestaurants.findIndex(
              (dataIndex) =>
                dataIndex.brandName === this.selectCardList.cardBrandName
            );
            console.log(dataIndex);

            // 會員餐廳API沒有屬性comment，需要用物件取值的括弧記法在這邊新增屬性並為它賦值
            userData.userRestaurants[dataIndex]["comment"] =
              this.selectCardList.cardComment;

            axios
              .put(this.apiUserResIdUrl, userData)
              .then((res) => {
                console.log(res);
                alert("該餐廳評論已更新");
                this.userPocket();
              })
              .catch((error) => {
                console.log(error);
                alert("餐廳評論更新失敗");
              });

            // 重置表單內容寫法1
            // 表單提交後讓所有欄位重置成預設值
            // this.resetTable();
          })
          .catch((error) => {
            console.log(error);
            alert("無法更新到會員口袋餐廳裡，請洽網站管理員!");
            // 重置表單內容寫法1
            // });
            // 重置表單內容寫法2
          })
          // 重置表單內容寫法2
          .finally(() => {
            // 不論請求成功或失敗都會執行
            this.resetTable();
          });
      } else {
        alert("餐廳評欄位不可空值!");
      }
    },
    delComment() {
      event.preventDefault(); // 禁止按鈕提交的默認行為

      // 餐廳評論欄位必須有值才可提交表單
      if (this.selectCardList.cardComment !== "") {
        axios
          .get(this.apiUserResUrl)
          .then((res) => {
            console.log(res);

            // res.data是陣列要變成物件後面才能用push，所以取第一個內容(這裡是物件)
            const userData = res.data[0];

            const dataIndex = userData.userRestaurants.findIndex(
              (dataIndex) =>
                dataIndex.brandName === this.selectCardList.cardBrandName
            );

            userData.userRestaurants[dataIndex].comment = "";

            axios
              .put(this.apiUserResIdUrl, userData)
              .then((res) => {
                console.log(res);
                alert("該餐廳評論已移除");

                // 表單提交後讓所有欄位重置成預設值
                this.resetTable();
                this.userPocket();
              })
              .catch((error) => {
                console.log(error);
                alert("移除該餐廳評論失敗");
              });
          })
          .catch((error) => {
            console.log(error);
            alert("無法更新到會員口袋餐廳裡，請洽網站管理員!");
          });
      } else {
        alert("餐廳評欄位已是空值，無法移除評論!");
      }
    },
    // 法4(不用pinia store)
    // logout() {
    //   localStorage.clear();
    // },
  },
  created() {
    // 法4(不用pinia store)
    // const userInfoString = localStorage.getItem("user-info");
    // // 檢查 user-info 是否存在，存在才執行
    // if (userInfoString) {
    //   this.userInfo = JSON.parse(userInfoString);
    //   this.userInfoName = this.userInfo[0]?.name;
    //   this.userInfoEmail = this.userInfo[0]?.email;
    //   this.userInfoId = this.userInfo[0]?.id;

    //   // 法4(不用pinia store)
    //   // this.apiUserResUrl = `http://localhost:3002/userRes?email=${this.userInfoEmail}`;
    //   // this.apiUserResIdUrl = `http://localhost:3002/userRes/${this.userInfoId}`;
    // }

    // 把axios路徑定義為全域變數，讓方法中各函式可調用
    // 法1、2、3
    this.apiUserResUrl = `http://localhost:3002/userRes?email=${this.userEmail}`;
    this.apiUserResIdUrl = `http://localhost:3002/userRes/${this.userId}`;
  },
  mounted() {
    this.userPocket();
  },
  // 監聽data
  computed: {
    // 法1、2、3
    ...mapState(useLoginStore, {
      // 'name' 是 store 中的狀態名，'userName' 是在組件中的名稱
      userName: (state) => state.name,
      userEmail: (state) => state.email,
      userId: (state) => state.id,
    }),
  },
};
</script>
