<template>
  <div class="container p-4">
    <h1>Dashboard</h1>
  </div>
  <div class="container">
    <h5>My Consultation</h5>
    <div class="row mb-2">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Consultation</div>
          <div class="card-body p-0">
            <div v-if="consultation.length == 0" class="p-2">
            <RouterLink  to="/request_consultation" class="decoration">+ <span style="text-decoration:underline">Request Consultation</span></RouterLink>
            </div>
            <table v-else class="table table-striped">
              <tbody>
                <tr>
                  <td class="p-2">Status</td>
                  <td><span class="badge bg-info" style="text-transform:capitalize">{{consultation.status}}</span></td>
                </tr>
                <tr>
                  <td class="p-2">Disease History</td>
                  <td>{{consultation.disease_history}}</td>
                </tr>
                <tr>
                  <td class="p-2">Current Symptoms</td>
                  <td>{{consultation.current_symptoms}}</td>
                </tr>
                <tr>
                  <td class="p-2">Doctor Name</td>
                  <td v-if="consultation.doctor === undefined"></td>
                  <td v-else-if="consultation.doctor === null">Doktor Belum Ada</td>
                  <td v-else>{{consultation.doctor.name}}</td>
                </tr>
                <tr>
                  <td class="p-2">Doctor Notes</td>
                  <td>{{consultation.doctor_notes}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <h5>My Vaccinations</h5>
    <div v-if="vaccinations.length <= 0" class="alert alert-warning">Your Consultation must be accepted by doctor to get vaccine.</div>
  </div>
</template>

<style>
  .decoration{
    text-decoration:none
  }
</style>
<script>
  export default{
    mounted(){
      var vue = this;
      /*setTimeout(() => {
        vue.consultation = {
          status: 'accepted',
          disease_history: 'diabetes',
          current_symptoms: 'flu',
          doctor:{
            role:'doctor',
            name:'Dr. Heraya'
          },
          doctor_notes: "ok"
        };
      },2000)*/
    },
    data(){
      return {
        consultation: [],
        vaccinations: []
      }
    }
  }
</script>