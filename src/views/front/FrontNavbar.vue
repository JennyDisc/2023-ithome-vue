<template>
  <nav class="navbar navbar-expand-lg main-nav mb-5">
    <div class="container-fluid">
      <a class="navbar-brand d-lg-none" href="#">主選單</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink
              to="/login/main"
              class="nav-link py-3 px-4"
              aria-current="page"
              >主頁</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/login/pocket" class="nav-link py-3 px-4"
              >口袋餐廳</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/login/comment" class="nav-link py-3 px-4"
              >餐廳實評</RouterLink
            >
          </li>
          <li class="nav-item">
            <!-- 法1、2、3 -->
            <RouterLink to="/login" class="nav-link py-3 px-4">登出</RouterLink>
            <!-- 法4 -->
            <!-- <RouterLink to="/login" class="nav-link py-3 px-4" @click="logout"
          >登出</RouterLink
        > -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "FrontNavbar",
};
</script>
