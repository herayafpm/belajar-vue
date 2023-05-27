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
            <a class="nav-link" style="cursor: pointer" @click="logout"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <section>
    <RouterView v-model="user" :message_success_post="message_success_post" />
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
      message_success_post: "",
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
      var vue = this;
      vue.message_success_post = "";
      var xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status == 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("login_tokens");
          this.user = {};
          this.$router.go();
        } else if (xhr.status == 200) {
          var response = JSON.parse(xhr.response);
          vue.message_success_post = response.message;
          setTimeout(function () {
            localStorage.removeItem("user");
            localStorage.removeItem("login_tokens");
            vue.user = {};
            vue.$router.go();
          }, 2000);
        }
      };
      xhr.open("POST", this.$apiURL + "auth/logout?token=" + this.user.token);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(null);
    },
  },
};
</script>
