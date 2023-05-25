<template>
  <template v-if="'spot' in spot">
    <div class="container p-4">
        <div class="row">
            <div class="col-md-6">
                <h1>{{spot.spot.name}}</h1>
                <p>{{spot.spot.address}}</p>
            </div>
            <div class="col-md-6 pt-4 text-end">
                <button @click.prevent="register" type="button" class="btn btn-primary" :disabled="spot.vaccinations_count >= spot.spot.capacity">Register Vaccination</button>
            </div>
        </div>
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
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-label">Select vaccination date</label><br/>
                    <input type="date" v-model="vaccination_date" />
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-4" v-for="(session,index) in sessions">
                <div class="card">
                    <div class="card-body">
                        <div class="row justify-align-between">
                            <div class="col" style="font-weight:bold">{{session.name}}</div>
                            <div class="col" style="text-align:right">{{session.time}}</div>
                        </div>
                        <div class="d-flex mt-2 flex-wrap gap-4">
                            <div class="card" v-for="numb in range(index * (spot.spot.capacity / sessions.length),(index + 1) * (spot.spot.capacity / sessions.length) - 1)" :style="[(numb+1 <= spot.vaccinations_count?'border-color:green':''),(numb+1 == spot.vaccinations_count + 1?'background-color:var(--bs-cyan);color:white':'')]">
                                <div class="card-body">
                                    #{{numb + 1}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
</template>

<script>
  export default{
    props: ['spot_id'],
    mounted(){
      this.getSpot()
    },
    watch: {
        vaccination_date: {
            handler: function(val){
                this.getSpot()
            }
        }
    },
    methods: {
      getSpot(){
        var xhr = new XMLHttpRequest();
        var vue = this;
        xhr.onload = () => {
          if(xhr.status == 200){
            var response = JSON.parse(xhr.response);
            vue.spot = response;
          }else{
            vue.spot = {}
          }
        }
        xhr.open("GET",this.$apiURL+'spots/'+this.spot_id+'?token='+this.$attrs.modelValue.token+'&date='+vue.vaccination_date)
        xhr.send(null)
      },
      range(start, end) {
        return new Array(end - start + 1).fill().map((d, i) => i + start);
      },
      register(){
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
        xhr.open("POST", this.$apiURL + "vaccinations?token="+this.$attrs.modelValue.token);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(
          JSON.stringify({
            spot_id: this.spot_id,
            date: this.vaccination_date,
          })
        );
      }
    },
    data(){
      return {
        vaccination_date: new Date().toISOString().slice(0, 10),
        message_success_post: "",
        message_error_post: "",
        spot: {},
        sessions: [
            {
                name: 'Session 1',
                time: '09:00 - 11:00',
            },
            {
                name: 'Session 2',
                time: '13:00 - 15:00',
            },
            {
                name: 'Session 3',
                time: '15:00 - 17:00',
            },
        ]
      }
    }
  }
</script>