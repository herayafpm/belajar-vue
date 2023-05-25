<template>
  <div class="container p-4">
    <h1>Request Consultation</h1>
  </div>
  <div class="container">
    <div
      v-if="message_success_post.length > 0"
      class="alert alert-success"
      v-html="message_success_post"
    ></div>
    <div
      v-if="message_error_post.length > 0"
      class="alert alert-danger"
      v-html="message_error_post"
    ></div>
    <form @submit.prevent="submit">
      <div class="row mb-2">
        <div class="col-md-6">
          <label class="me-2">Do you have disease history?</label>
          <select v-model="have_disease_history">
            <option :value="true">Yes, I Have</option>
            <option :value="false">No</option>
          </select>
        </div>
      </div>
      <div v-if="have_disease_history" class="row mb-2">
        <div class="col-md-6">
          <textarea v-model="disease_history" placeholder="Describe Your Disease History" cols="60" rows="6"></textarea>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <label class="me-2">Do you have symptoms now?</label>
          <select v-model="have_current_symptoms">
            <option :value="true">Yes, I Have</option>
            <option :value="false">No</option>
          </select>
        </div>
      </div>
      <div v-if="have_current_symptoms" class="row mb-2">
        <div class="col-md-6">
          <textarea v-model="current_symptoms" placeholder="Describe Your Current Symptoms" cols="60" rows="6"></textarea>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-md-4">
          <button type="submit" class="btn btn-primary">Send Request</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default{
    mounted(){
    },
    methods: {
      submit(){
        this.message_error_post = ""
        this.message_success_post = ""
        var vue = this;
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
          if (xhr.status == 401) {
            var response = JSON.parse(xhr.response);
            vue.message_error_post = response.message;
          } else if (xhr.status == 200) {
            var response = JSON.parse(xhr.response);
            vue.message_success_post = response.message;
            setTimeout(function(){
              vue.$router.push({ name: "home" });
            },1000)
          }
        };
        xhr.open("POST", this.$apiURL + "consultations?token="+this.$attrs.modelValue.token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(
          JSON.stringify({
            disease_history: this.disease_history,
            current_symptoms: this.current_symptoms,
          })
        );
      }
    },
    watch:{
      have_disease_history: {
        handler: function(val){
          if(!val){
            this.disease_history = ""
          }
        }
      }
    },
    data(){
      return {
        message_success_post: "",
        message_error_post: "",
        have_disease_history: true,
        disease_history: "",
        have_current_symptoms: true,
        current_symptoms: "",
      }
    }
  }
</script>