<template>
  <div class="container">
    <FrontNavbar />
    <section class="row mb-4">
      <div class="col-lg"></div>
      <div class="col-4 d-none d-lg-block">
        <img
          src="https://images.unsplash.com/photo-1603481502506-275d81ffcdef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
          alt="關於喜愛的圖"
          class="img-fluid"
        />
      </div>
      <div class="col-lg"></div>
      <div class="col col-lg-4">
        <form>
          <h1 class="mb-4 text-center">新增口袋餐廳</h1>
          <div class="row g-2 mb-3">
            <label for="type" class="col-sm-3 col-form-label">品牌受眾</label>
            <select
              name="品牌受眾"
              id="type"
              class="form-select col-sm"
              @change="selectTypeChange"
              v-model="tempRes.selectType"
            >
              <option value="" disabled selected>請選擇品牌受眾</option>
              <option value="全部受眾">全部受眾</option>
              <!-- 選項重複 -->
              <!-- <option
                :value="item.type"
                v-for="item in restaurants"
                v-bind:key="item.id"
              >
                {{ item.type }}
              </option> -->

              <!-- 排除選項重複 -->
              <option
                :value="type"
                v-for="type in uniqueTypes"
                v-bind:key="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
          <div class="row g-2 mb-3">
            <label for="res-name" class="col-sm-3 col-form-label"
              >品牌名稱</label
            >

            <!-- :disabled 避免會員跳過選類型而直接選名稱-->
            <select
              name="品牌名稱"
              id="res-name"
              class="form-select col-sm"
              :disabled="brandListDisabled"
              @change="selectNameChange"
              v-model="tempRes.selectBrandName"
            >
              <option value="" disabled selected>請選擇品牌名稱</option>
              <option
                :value="item"
                v-for="item in filterRes.filterBrandName"
                v-bind:key="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="row g-2 mb-3">
            <label for="address" class="col-sm-3 col-form-label">地址</label>
            <input
              class="form-control col-sm"
              type="text"
              disabled
              id="address"
              :placeholder="filterRes.filterAddress"
            />
          </div>
          <div class="mb-4" v-if="filterRes.filterMapUrl !== ''">
            <iframe
              :src="filterRes.filterMapUrl"
              width="100%"
              height="350"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-lg btn-primary mb-4"
              type="submit"
              @click="submitPucket()"
            >
              加入口袋
            </button>
          </div>
        </form>
      </div>
      <div class="col-lg"></div>
    </section>
    <section class="mb-4">
      <div class="d-flex justify-content-end mb-4">
        <!-- 依品牌受眾排序 -->
        <!-- 升 -->
        <!-- <button type="button" class="btn btn-warning" @click="orderByList">依品牌受眾排序</button> -->

        <!-- 升降冪 -->
        <button type="button" class="btn btn-warning" @click="toggleSorting">
          依品牌受眾排序
        </button>
      </div>

      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col" class="table-secondary">品牌受眾</th>
            <th scope="col" class="table-secondary">品牌名稱</th>
            <th scope="col" class="table-secondary">地址</th>
            <th scope="col" class="table-warning">動作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 依品牌受眾排序 -->
          <!-- 按了排序紐，會取排序過的orderByList資料，若否則不排序的userResList資料。按了鈕後再按變成判斷資料升或降冪排序 -->
          <tr
            v-for="item in isSorting ? orderByList : userResList"
            v-bind:key="item"
          >
            <!-- 不排序(秀api原始資料順序) -->
            <!--  <tr v-for="item in userResList" v-bind:key="item"> -->

            <td>{{ item.type }}</td>
            <td>{{ item.brandName }}</td>
            <td>{{ item.address }}</td>
            <td class="table-warning">
              <button
                type="button"
                class="btn btn-secondary"
                @click="delPucket(item)"
              >
                移除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      // 屬性說明請見https://ithelp.ithome.com.tw/articles/10332391
      // 餐廳 API 取得的資料放 restaurants 裡
      restaurants: [],
      // 原始 API 抓来未排序的資料
      userResList: [],
      // 會員選的項目值，要拿來做為條件去過濾從餐廳 API 取得的資料
      filterRes: {
        filterBrandName: [],
        filterType: [],
        filterAddress: "",
        filterMapUrl: "",
      },
      // 會員選完「品牌受眾」、「品牌名稱」的項目值放在 tempRes 裡相應的屬性中
      tempRes: {
        selectBrandName: "",
        selectType: "",
      },
      // 會員選好的餐廳且處理完畢，用來直接存放寫回會員餐廳 API 的資
      saveRes: {
        saveBrandName: "",
        saveType: "",
        saveAddress: "",
        saveMapUrl: "",
      },
      // 控制品牌名稱選單是否可以操作。true不可操作
      brandListDisabled: true,

      // 是否要排序過的資料
      isSorting: false,

      // 資料排序方式：升(true)降(false)冪
      ascending: true,

      // 法1、2、3、4
      // axios的url初始化為空字符串，稍後在 created() 中設置
      apiUserResUrl: "",
      apiUserResIdUrl: "",

      // 法4
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
    pocket() {
      axios
        .get("http://localhost:3001/restaurants")
        .then((res) => {
          // 請求成功會觸發/執行這個 function 函式
          this.restaurants = res.data;
          // console.log(this.uniqueTypes);
        })
        .catch((error) => {
          // 請求失敗則觸發/執行這個 function 函式
          console.log(error);
        });
    },
    userPocket() {
      axios
        .get(this.apiUserResUrl)
        .then((res) => {
          console.log(res);
          // 將會員餐廳取得的資料賦值給既有restaurants
          this.userResList = res.data[0].userRestaurants;
          // console.log(this.userResList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectTypeChange() {
      // 當會員下拉品牌受眾時，變更這個屬性值，讓品牌名稱選單可以操作
      this.brandListDisabled = false;

      // 會員所選tempRes.selectType賦值給filterRes.filterType
      this.filterRes.filterType = this.tempRes.selectType;

      this.saveRes.saveType = this.tempRes.selectType;

      if (this.tempRes.selectType !== "全部受眾") {
        // 會員選擇受眾時，依照所選受眾去restaurants找相應的品牌名稱
        this.filterRes.filterBrandName = this.restaurants
          .filter((item) => item.type === this.tempRes.selectType)
          .map((item) => item.brandName);
        // console.log(this.filterRes.filterBrandName);
      } else {
        // 會員選擇全部受眾時，列出restaurants全部品牌名稱
        this.filterRes.filterBrandName = this.restaurants.map(
          (item) => item.brandName
        );
        // console.log(this.filterRes.filterBrandName);
        // console.log(this.filterRes.filterType);
      }
      // 當會員回頭更改選品牌受眾。請讓其他兩個欄位重置成預設值
      this.tempRes.selectBrandName = "";
      this.filterRes.filterAddress = "";
    },
    resetTable() {
      // 讓所有欄位重置成預設值
      this.tempRes.selectType = "";
      this.tempRes.selectBrandName = "";
      this.filterRes.filterAddress = "";
      this.filterRes.filterMapUrl = "";
    },
    selectNameChange() {
      // 會員所選tempRes.selectBrandName賦值給saveRes.saveBrandName
      this.saveRes.saveBrandName = this.tempRes.selectBrandName;

      // 會員選擇品牌名稱時，依照所選名稱去restaurants找相應的地址
      this.filterRes.filterAddress = this.restaurants
        .filter((item) => item.brandName === this.tempRes.selectBrandName)
        .map((item) => item.address);
      // console.log(this.filterRes.filterAddress);

      this.filterRes.filterMapUrl = this.restaurants
        .filter((item) => item.brandName === this.tempRes.selectBrandName)
        .map((item) => item.mapUrl);
      // console.log(this.filterRes.filterMapUrl);

      // 在API中地址是字串型態，所以要寫filterRes.filterAddress[0]，如果不寫[0]在API會是陣列
      this.saveRes.saveAddress = this.filterRes.filterAddress[0];

      this.saveRes.saveMapUrl = this.filterRes.filterMapUrl[0];

      if (this.filterRes.filterType === "全部受眾") {
        // 當品牌受眾=全部受眾時，依照所選品牌名稱去restaurants找正確的受眾值。將全部受眾進行導正找出餐廳對應的值
        this.filterRes.filterType = this.restaurants
          .filter((item) => item.brandName === this.tempRes.selectBrandName)
          .map((item) => item.type);
        // console.log(this.filterRes.filterType);

        // 將取得的真正品牌受眾值賦值給寫回api的saveRes.saveType屬性
        this.saveRes.saveType = this.filterRes.filterType[0];
      }
    },
    submitPucket() {
      event.preventDefault(); // 禁止按鈕提交的默認行為

      // 所有欄位必須有值才可提交表單
      if (
        (this.saveRes.saveBrandName !== "") &
        (this.saveRes.saveAddress !== "") &
        (this.saveRes.saveType !== "")
      ) {
        axios
          .get(this.apiUserResUrl)
          .then((res) => {
            console.log(res);

            // res.data是陣列要變成物件後面才能用push，所以取第一個內容(這裡是物件)
            const userData = res.data[0];
            // console.log(userData);
            const newRestaurant = {
              brandName: this.saveRes.saveBrandName,
              address: this.saveRes.saveAddress,
              type: this.saveRes.saveType,
              mapUrl: this.saveRes.saveMapUrl,
            };

            // 使用陣列方法 some 檢查會員餐廳API是否有已存在的brandName
            const exists = userData.userRestaurants.some(
              (item) => item.brandName === newRestaurant.brandName
            );
            // console.log(exists);
            if (!exists) {
              // 將一個新的餐廳物件（newRestaurant）添加到 userData 物件中的 userRestaurants 陣列中
              userData.userRestaurants.push(newRestaurant);
              alert("口袋添加成功");
              axios.put(this.apiUserResIdUrl, userData);

              this.userPocket();
            } else {
              alert("該餐廳已存在!");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("口袋添加失敗");
          });
      } else {
        alert("欄位不可空值!");
      }

      // 表單提交後讓所有欄位重置成預設值
      this.resetTable();
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
    // 使用v-for渲染列表時，每一列的移除按鈕上的@click事件處理程序會自動傳遞該行的數據（即item，包含type、brandName、address）給方法。所以點擊那行移除紐，會回傳那行的餐廳資料
    delPucket(item) {
      axios.get(this.apiUserResUrl).then((res) => {
        // console.log(res);
        const userData = res.data[0];
        const dataIndex = userData.userRestaurants.findIndex(
          (dataIndex) => dataIndex.brandName === item.brandName
        );
        // console.log(dataIndex);

        userData.userRestaurants.splice(dataIndex, 1);
        // console.log(userData);

        axios
          .put(this.apiUserResIdUrl, userData)
          .then((res) => {
            console.log(res);
            alert("成功移除該筆餐廳");

            this.userPocket();
          })
          .catch((error) => {
            console.log(error);
            alert("該筆餐廳移除失敗，請洽網站管理員!");
          })
          .finally(() => {
            // 不論請求成功或失敗都會執行
            this.resetTable();
          });
      });
    },
    // 法4
    // logout() {
    //   localStorage.clear();
    // },
  },
  // created 是實例創建完成階段，可訪問 data 、 computed 、 watch、 methods 上的方法和數據
  created() {
    // 法4
    // const userInfoString = localStorage.getItem("user-info");
    // // 檢查 user-info 是否存在，存在才執行
    // if (userInfoString) {
    //   this.userInfo = JSON.parse(userInfoString);
    //   this.userInfoName = this.userInfo[0]?.name;
    //   this.userInfoEmail = this.userInfo[0]?.email;
    //   this.userInfoId = this.userInfo[0]?.id;

    //   // 法4
    //   // this.apiUserResUrl = `http://localhost:3002/userRes?email=${this.userInfoEmail}`;
    //   // this.apiUserResIdUrl = `http://localhost:3002/userRes/${this.userInfoId}`;
    // }

    // 把axios路徑定義為全域變數，讓方法中各函式可調用
    // 法1、2、3
    this.apiUserResUrl = `http://localhost:3002/userRes?email=${this.userEmail}`;
    this.apiUserResIdUrl = `http://localhost:3002/userRes/${this.userId}`;
  },
  mounted() {
    this.pocket();
    this.userPocket();
  },
  // 監聽data
  computed: {
    // 取品牌受眾值不重複的值
    uniqueTypes() {
      return Array.from(new Set(this.restaurants.map((item) => item.type)));
    },
    // 法1、2、3
    ...mapState(useLoginStore, {
      // 'name' 是 store 中的狀態名，'userName' 是在組件中的名稱
      userName: (state) => state.name,
      userEmail: (state) => state.email,
      userId: (state) => state.id,
    }),
    orderByList() {
      const orderUserResList = [...this.userResList];
      orderUserResList.sort((a, b) => {
        return this.ascending
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      });
      return orderUserResList;
    },
  },
};
</script>
