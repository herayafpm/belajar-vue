<template>
  <div class="container p-4">
    <h1 v-if="vaccination == 1">First Vaccination</h1>
    <h1 v-else>Second Vaccination</h1>
  </div>
  <div class="container">
    <p class="ps-3 pe-3">List Vaccination Spots in {{this.$attrs.modelValue.regional.district}} Provinsi {{this.$attrs.modelValue.regional.province}}</p>
    <div v-if="spots.length > 0" class="container">
      <div v-for="spot in spots" class="card mb-3" :class="(spot.serve == vaccination || spot.serve == 3)?'opacity-100':'opacity-50'">
        <div class="card-header">
          <div class="row">
            <div class="col-md-4">
              <RouterLink v-if="(spot.serve == vaccination || spot.serve == 3)" style="text-decoration:none;" :to="'/spot_detail/'+spot.id">{{spot.name}}</RouterLink>
              <a v-else class="text-primary" style="text-decoration:none;" >{{spot.name}}</a>
              <p>{{spot.address}}</p>
            </div>
            <div class="col-md-4">
              <p style="font-weight:bold">Available Vaccines</p>
              <template v-for="vaccine in Object.keys(spot.available_vaccines)">
                <span v-if="spot.available_vaccines[vaccine]">{{vaccine}}, </span>
              </template>
            </div>
            <div class="col-md-4">
              <p style="font-weight:bold">Serve</p>
              <p v-if="spot.serve == 1">Only first vaccination</p>
              <p v-else-if="spot.serve == 2">Only second vaccination</p>
              <p v-else>Both vaccination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['vaccination'],
    mounted(){
      this.getSpots()
    },
    methods: {
      getSpots(){
        var xhr = new XMLHttpRequest();
        var vue = this;
        xhr.onload = () => {
          if(xhr.status == 200){
            var response = JSON.parse(xhr.response);
            vue.spots = response.spots;
          }else{
            vue.spots = []
          }
        }
        xhr.open("GET",this.$apiURL+'spots?token='+this.$attrs.modelValue.token)
        xhr.send(null)
      }
    },
    data(){
      return {
        spots: [],
      }
    }
  }
</script>