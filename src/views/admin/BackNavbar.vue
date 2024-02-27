<template>
  <ul class="nav main-nav mb-5">
    <li class="nav-item">
      <RouterLink
        to="/adminlogin/main"
        class="nav-link active py-3 px-4"
        aria-current="page"
        >主頁</RouterLink
      >
    </li>
    <li class="nav-item">
      <RouterLink to="/adminlogin/restaurantlist" class="nav-link py-3 px-4"
        >管理餐廳列表</RouterLink
      >
    </li>
    <li class="nav-item">
      <!-- 法1、2、3 -->
      <RouterLink to="/adminlogin" class="nav-link py-3 px-4">登出</RouterLink>
      <!-- 法4 -->
      <!-- <RouterLink to="/adminlogin" class="nav-link py-3 px-4" @click="logout"
            >登出</RouterLink
          > -->
    </li>
  </ul>
</template>

<script>
export default {
  name: "FrontNavbar",
};
</script>
