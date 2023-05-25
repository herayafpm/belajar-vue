<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">Vaccination Platform</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarHeader"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarHeader">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
          <li v-if="user != null" class="nav-item">
            <a class="nav-link" style="cursor:pointer" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <section>
    <RouterView v-model="user" />
  </section>
</template>

<style scoped></style>

<script>
export default {
  mounted() {
    this.initUser();
  },
  data() {
    return {
      user: null,
    };
  },
  watch: {
    $route() {
      this.$nextTick(this.initUser);
    },
  },
  methods: {
    initUser() {
      if (localStorage.getItem("user") != null) {
        this.user = JSON.parse(atob(localStorage.getItem("user")));
      }
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("login_tokens");
      this.user = {};
      this.$router.go();
    },
  },
};
</script>
