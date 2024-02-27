<template>
  <div class="container">
    <BackNavbar />
    <section class="mb-4 admminRes">
      <div class="d-flex justify-content-end mb-4">
        <button type="button" class="btn btn-primary me-4" @click="addResItem">
          新增餐廳
        </button>

        <!-- 依品牌受眾排序 -->
        <!-- 升 -->
        <!-- <button type="button" class="btn btn-warning" @click="orderByList">依品牌受眾排序</button> -->

        <!-- 升降冪 -->
        <!-- <button type="button" class="btn btn-warning disable" @click="toggleSorting">
            依品牌受眾排序
          </button> -->
      </div>
      <table class="table table-bordered table-hover mb-4">
        <thead>
          <tr>
            <th scope="col" class="table-secondary">品牌受眾</th>
            <th scope="col" class="table-secondary">品牌名稱</th>
            <th scope="col" class="table-secondary">地址</th>
          </tr>
        </thead>
        <tbody>
          <!-- 依品牌受眾排序 -->
          <!-- 按了排序紐，會取排序過的orderByList資料，若否則不排序的restaurants資料。按了鈕後再按變成判斷資料升或降冪排序 -->
          <tr
            v-for="item in isSorting ? orderByList : restaurants"
            v-bind:key="item"
          >
            <!-- 不排序(秀api原始資料順序) -->
            <!-- <tr v-for="item in restaurants" v-bind:key="item"> -->
            <td>
              <input
                v-if="item.addRowDisabled"
                type="text"
                readonly
                class="form-control-plaintext"
                :value="item.type"
              />
              <select
                v-else
                name="品牌受眾"
                id="type"
                class="form-select"
                :disabled="item.addRowDisabled"
                v-model="inputAddItem.addType"
              >
                <option value="" disabled selected>請選擇品牌受眾</option>
                <option
                  :value="item"
                  v-for="item in resTypeList"
                  v-bind:key="item"
                >
                  {{ item }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-if="item.addRowDisabled"
                type="text"
                readonly
                class="form-control-plaintext"
                :value="item.brandName"
              />
              <input
                v-else
                class="form-control"
                type="text"
                :disabled="item.addRowDisabled"
                placeholder="請輸入品牌名稱"
                v-model="inputAddItem.addBrandName"
              />
            </td>
            <td>
              <input
                v-if="item.addRowDisabled"
                type="text"
                readonly
                class="form-control-plaintext"
                :value="item.address"
              />
              <input
                v-else
                class="form-control"
                type="text"
                :disabled="item.addRowDisabled"
                placeholder="請輸入餐廳地址"
                v-model="inputAddItem.addAddress"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end" v-if="submitShow">
        <button
          class="btn btn-lg btn-secondary"
          type="submit"
          @click="submitAddRes()"
        >
          送出
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import BackNavbar from "../admin/BackNavbar.vue";
import axios from "axios";
// 法1、2、3
import { mapState } from "pinia";

// 寫法1和2(定義好的 store 賦值給變數 useAdminLoginStore)
// 在元件中引入並呼叫 useAdminLoginStore() 來訪問 store
import { useAdminLoginStore } from "../../components/AdminLoginStore.js";

// 寫法3(默認導出 store)
// 在其他 Vue 文件中導入默認導出的 store，使用時要取名
// import useAdminLoginStore from "../../components/AdminLoginStore.js";

export default {
  data() {
    return {
      // 原始 API 抓来未排序的資料
      restaurants: [],
      // 管理者輸入的「品牌受眾」、「品牌名稱」、「地址」值放在 inputAddItem 裡相應的屬性中
      inputAddItem: {
        addBrandName: "",
        addType: "",
        addAddress: "",
      },
      // 「品牌受眾」下拉選單內容
      resTypeList: ["學生族群", "小資族群", "精緻族群", "頂級族群"],
      // 控制表格內的提交鈕是否要顯現。false隱藏
      submitShow: false,

      // 是否要排序過的資料
      isSorting: false,
      // 資料排序方式：升(true)降(false)冪
      ascending: true,

      // 法1、2、3、4
      // axios的url初始化為空字符串，稍後在 created() 中設置
      apiResUrl: "",

      // 法4(不用pinia store)
      // data() {
      //   return {
      //     adminInfo: null, // 先初始化定義為 null
      //     adminInfoName:null, // 先初始化定義為 null
      //   };
      // },
    };
  },
  components: {
    // 註冊引入的組件
    BackNavbar,
  },
  methods: {
    pocket() {
      axios
        .get(this.apiResUrl)
        .then((res) => {
          this.restaurants = res.data;
          this.restaurants.forEach((item) => {
            item["addRowDisabled"] = true;
          });
          // console.log(this.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addResItem() {
      const exists = this.restaurants.some((item) => item.brandName === "");
      // 使用陣列方法 some 檢查餐廳API是否有已存在的空白brandName
      if (!exists) {
        this.restaurants.push({
          type: "",
          brandName: "",
          address: "",
          addRowDisabled: false,
        });

        this.submitShow = true;
      } else {
        alert("已有空白列供填寫，請輸入完畢後再新增!");
      }
    },
    toggleSorting() {
      if (this.ascending) {
        // 降冪(false)排序
        this.ascending = !this.ascending;
        // 要排序過的資料
        this.isSorting = true;
      } else {
        // 升冪(true)排序
        this.ascending = true;
      }
    },
    resetTable() {
      this.inputAddItem.addBrandName = "";
      this.inputAddItem.addType = "";
      this.inputAddItem.addAddress = "";
    },
    submitAddRes() {
      event.preventDefault(); // 禁止按鈕提交的默認行為

      // 所有欄位必須有值才可提交表單
      if (
        (this.inputAddItem.addType !== "") &
        (this.inputAddItem.addBrandName !== "") &
        (this.inputAddItem.addAddress !== "")
      ) {
        axios
          .get(this.apiResUrl)
          .then((res) => {
            // console.log(res);

            // res.data是陣列用來檢查該餐廳名稱是否已存在
            const userData = res.data;
            // console.log(userData);
            const userDataLength = userData.length;
            // console.log(userDataLength);
            // 使用陣列方法 some 檢查餐廳API是否有已存在的brandName
            const exists = userData.some(
              (item) => item.brandName === this.inputAddItem.addBrandName
            );
            // console.log(exists);
            if (!exists) {
              axios.post(this.apiResUrl, {
                type: this.inputAddItem.addType,
                brandName: this.inputAddItem.addBrandName,
                address: this.inputAddItem.addAddress,
                mapUrl: "",
                // 系統自動新增的id是隨機英文，不是先前的數值，只好人工寫入
                // 數字轉換字串,
                id: (userDataLength + 1).toString(),
              });
              alert("餐廳新增成功");
              this.submitShow = false;
              this.pocket();
            } else {
              alert("該餐廳已存在!");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("餐廳新增失敗!");
          })
          .finally(() => {
            this.resetTable();
          });
      } else {
        alert("欄位不可空值!");
      }
    },
    // 法4
    // logout() {
    //   localStorage.clear();
    // },
  },
  // created 是初始化執行(html模板渲染之前)
  created() {
    // 法4(不用pinia store)
    //   const adminInfoString = localStorage.getItem("admin-info");
    //   // 檢查 admin-info 是否存在，存在才執行
    //   if (adminInfoString) {
    //     this.adminInfo = JSON.parse(adminInfoString);
    //     this.adminInfoName=(this.adminInfo[0]?.name);
    //     console.log(this.adminInfoName);
    // },

    // 把axios路徑定義為全域變數，讓方法中各函式可調用
    // 法1、2、3
    this.apiResUrl = `http://localhost:3001/restaurants`;
  },
  mounted() {
    this.pocket();
  },
  // 法1、2、3
  computed: {
    ...mapState(useAdminLoginStore, {
      // 'name' 是 store 中的狀態名，'userName' 是在組件中的名稱
      userName: (state) => state.name,
      userEmail: (state) => state.email,
      userId: (state) => state.id,
    }),
    orderByList() {
      const orderRestaurants = [...this.restaurants];
      orderRestaurants.sort((a, b) => {
        return this.ascending
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      });
      return orderRestaurants;
    },
  },
};
</script>
