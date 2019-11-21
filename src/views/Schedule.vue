<template>
  <div id="schedule">
    <h1>zarządzaj harmonogramem zeszytu.</h1>
    <table>
      <tr>
        <th>Dzień</th>
        <th>Osoba</th>
        <th>Adnotacje</th>
        <th>Usuń</th>
      </tr>
      <tr v-for="day in days" :key="day.date">
        <td>{{ day.date }}</td>
        <td>{{ day.user.Name }}</td>
        <td>{{ day.comment }}</td>
        <td>
          <a href="#" @click="() => deleteEntry(day.date)">Usuń</a>
        </td>
      </tr>
    </table>

    <schedule-form v-on:reloadData="loadData" />
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import addScheduleForm from "../components/AddScheduleForm.vue";

export default {
  name: "schedule",
  components: {
    "schedule-form": addScheduleForm
  },
  data() {
    return {
      days: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    deleteEntry(date) {
      axios
        .post(
          "https://zsktasks-api.herokuapp.com/notebookSchedule/deleteDay",
          {
            date
          },
          {
            headers: { Authorization: `Bearer ${this.$store.state.loginToken}` }
          }
        )
        .then(res => {
          // eslint-disable-next-line
          alert(res.data.message);
          this.loadData();
        });
    },
    loadData() {
      axios
        .get("https://zsktasks-api.herokuapp.com/notebookSchedule")
        .then(res => {
          this.days = [];
          res.data.map(day => {
            const improvedDay = day;
            improvedDay.date = moment(day.date).format("YYYY-MM-DD");
            return this.days.push(improvedDay);
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
#schedule {
  padding: 20px;

  a {
    color: black;
    text-decoration: underline;
  }

  h1 {
    font-size: 50px;
  }

  table {
    margin: 20px;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid #dddddd;

      &:hover {
        background-color: #eeeeee;
      }

      th {
        font-size: 20px;
        text-align: left;
        background-color: white;
      }

      td {
        padding: 5px;
        border: none;
        min-width: 400px;

        input[type="text"] {
          width: 100%;
          height: 100%;
          margin: 0;
          outline: none;
          border: none;
          font-size: 16px;
          min-width: 400px;
        }
      }

      td.table-field {
        font-weight: bold;
        min-width: unset;
      }
    }
  }
}
</style>
