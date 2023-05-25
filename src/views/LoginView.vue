<template>
  <div class="container p-4">
    <h1>Login</h1>
  </div>
  <div class="container">
    <div
      v-if="message_error_login.length > 0"
      class="alert alert-danger"
      v-html="message_error_login"
    ></div>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">ID Card Number</label>
            <input
              class="form-control"
              type="text"
              v-model="id_card_number"
              placeholder="Fill ID Card Number"
              :class="[message_id_card_number.length > 0 ? 'is-invalid' : '']"
            />
            <div
              v-if="message_id_card_number.length > 0"
              class="invalid-feedback"
              v-html="message_id_card_number"
            ></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              class="form-control"
              type="password"
              v-model="password"
              placeholder="Fill Password"
              :class="[message_password.length > 0 ? 'is-invalid' : '']"
            />
            <div
              v-if="message_password.length > 0"
              class="invalid-feedback"
              v-html="message_password"
            ></div>
          </div>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-md-4">
          <button type="submit" class="btn btn-success">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style></style>
<script>
export default {
  mounted() {},
  methods: {
    submit() {
      var vue = this;
      this.message_id_card_number = "";
      this.message_password = "";
      vue.message_error_login = "";
      var xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status == 400) {
          var response = JSON.parse(xhr.response);
          var keys = Object.keys(response);
          keys.forEach((key) => {
            var text = "";
            response[key].forEach((value) => {
              text += value + "<br/>";
            });
            vue["message_" + key] = text;
          });
        } else if (xhr.status == 401) {
          var response = JSON.parse(xhr.response);
          vue.message_error_login = response.message;
        } else if (xhr.status == 200) {
          var response = JSON.parse(xhr.response);
          localStorage.setItem("user", btoa(JSON.stringify(response)));
          localStorage.setItem("login_tokens", btoa(response.token));
          vue.$router.go({ name: "home" });
        }
      };
      xhr.open("POST", this.$apiURL + "auth/login");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(
        JSON.stringify({
          id_card_number: this.id_card_number,
          password: this.password,
        })
      );
    },
  },
  data() {
    return {
      id_card_number: "",
      password: "",
      message_error_login: "",
      message_id_card_number: "",
      message_password: "",
    };
  },
};
</script>
