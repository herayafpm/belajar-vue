<template>
  <div class="container p-4">
    <h1>Dashboard</h1>
  </div>
  <div class="container">
    <div
      v-if="this.$attrs.message_success_post.length > 0"
      class="alert alert-success"
      v-html="this.$attrs.message_success_post"
    ></div>
    <h5>My Consultation</h5>
    <div class="row mb-2">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Consultation</div>
          <div class="card-body p-0">
            <div v-if="consultation.length == 0" class="p-2">
              <RouterLink to="/request_consultation" class="decoration"
                >+
                <span style="text-decoration: underline"
                  >Request Consultation</span
                ></RouterLink
              >
            </div>
            <table v-else class="table table-striped">
              <tbody>
                <tr>
                  <td class="p-2">Status</td>
                  <td>
                    <span
                      class="badge bg-info"
                      style="text-transform: capitalize"
                      >{{ consultation.status }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td class="p-2">Disease History</td>
                  <td>{{ consultation.disease_history }}</td>
                </tr>
                <tr>
                  <td class="p-2">Current Symptoms</td>
                  <td>{{ consultation.current_symptoms }}</td>
                </tr>
                <tr>
                  <td class="p-2">Doctor Name</td>
                  <td v-if="consultation.doctor === undefined"></td>
                  <td v-else-if="consultation.doctor === null">-</td>
                  <td v-else>{{ consultation.doctor.name }}</td>
                </tr>
                <tr>
                  <td class="p-2">Doctor Notes</td>
                  <td>{{ consultation.doctor_notes }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <h5>My Vaccinations</h5>
    <div
      v-if="consultation.length === 0 || consultation.status !== 'accepted'"
      class="alert alert-warning"
    >
      Your Consultation must be accepted by doctor to get vaccine.
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-3">
          <div class="card">
            <div class="card-header">First Vaccination</div>
            <div class="card-body p-0">
              <div class="p-2" v-if="vaccinations.first.status === undefined">
                <RouterLink to="/list_spots/1" class="decoration"
                  >+
                  <span style="text-decoration: underline"
                    >Register Vaccination</span
                  ></RouterLink
                >
              </div>
              <table v-else class="table table-striped">
                <tbody>
                  <tr>
                    <td class="p-2">Status</td>
                    <td>
                      <span
                        class="badge bg-info"
                        style="text-transform: capitalize"
                        >{{ vaccinations.first.status }}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="p-2">Date</td>
                    <td>{{ vaccinations.first.vaccination_date }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Spot</td>
                    <td v-if="vaccinations.first.spot !== undefined">
                      {{ vaccinations.first.spot.name }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                  <tr>
                    <td class="p-2">Vaccine</td>
                    <td v-if="vaccinations.first.vaccine != null">
                      {{ vaccinations.first.vaccine.name }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                  <tr>
                    <td class="p-2">Vaccinator</td>
                    <td v-if="vaccinations.first.vaccinator != null">
                      {{ vaccinations.first.vaccinator.name }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-if="vaccinations.first.status === 'vaccinated'" class="col-md-3">
          <div class="card">
            <div class="card-header">Second Vaccination</div>
            <div class="card-body p-0">
              <div class="p-2" v-if="vaccinations.second.status === undefined">
                <RouterLink to="/list_spots/2" class="decoration"
                  >+
                  <span style="text-decoration: underline"
                    >Register Vaccination</span
                  ></RouterLink
                >
              </div>
              <table v-else class="table table-striped">
                <tbody>
                  <tr>
                    <td class="p-2">Status</td>
                    <td>
                      <span
                        class="badge bg-info"
                        style="text-transform: capitalize"
                        >{{ vaccinations.second.status }}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="p-2">Date</td>
                    <td>{{ vaccinations.second.vaccination_date }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Spot</td>
                    <td v-if="vaccinations.second.spot !== undefined">
                      {{ vaccinations.second.spot.name }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                  <tr>
                    <td class="p-2">Vaccine</td>
                    <td v-if="vaccinations.second.vaccine != null">
                      {{ vaccinations.second.vaccine.name }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                  <tr>
                    <td class="p-2">Vaccinator</td>
                    <td v-if="vaccinations.second.vaccinator != null">
                      {{ vaccinations.second.vaccinator.name }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.decoration {
  text-decoration: none;
}
</style>
<script>
export default {
  mounted() {
    this.getConsultation();
  },
  methods: {
    getVaccinations() {
      var xhr = new XMLHttpRequest();
      var vue = this;
      xhr.onload = () => {
        if (xhr.status == 200) {
          var response = JSON.parse(xhr.response);
          var vaccination = {
            first: {},
            second: {},
          };
          if ("first" in response.vaccination) {
            vaccination.first = response.vaccination.first;
          } else {
            vaccination.first = {};
          }
          if ("second" in response.vaccination) {
            vaccination.second = response.vaccination.second;
          } else {
            vaccination.second = {};
          }
          vue.vaccinations = vaccination;
        } else {
          vue.vaccinations = {
            first: {},
            second: {},
          };
        }
      };
      xhr.open(
        "GET",
        this.$apiURL + "vaccinations?token=" + this.$attrs.modelValue.token
      );
      xhr.send(null);
    },
    getConsultation() {
      var xhr = new XMLHttpRequest();
      var vue = this;
      xhr.onload = () => {
        if (xhr.status == 200) {
          var response = JSON.parse(xhr.response);
          vue.consultation = response.consultation;
          if ("status" in response.consultation) {
            if (response.consultation.status == "accepted") {
              vue.getVaccinations();
            }
          }
        } else {
          vue.consultation = [];
        }
      };
      xhr.open(
        "GET",
        this.$apiURL + "consultations?token=" + this.$attrs.modelValue.token
      );
      xhr.send(null);
    },
  },
  data() {
    return {
      consultation: [],
      vaccinations: {
        first: {},
        second: {},
      },
    };
  },
};
</script>
