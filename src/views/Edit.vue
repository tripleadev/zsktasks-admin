<template>
  <div id="edit">
    <h1>edytuj zadanie.</h1>
    <div v-if="task">
      <h3>Stara wersja:</h3>
      <table>
        <tr>
          <th>Pole</th>
          <th>Wartość</th>
        </tr>
        <tr>
          <td class="table-field">ID zadania</td>
          <td>{{ task.id }}</td>
        </tr>
        <tr>
          <td class="table-field">Nazwa zadania</td>
          <td>{{ task.title }}</td>
        </tr>
        <tr>
          <td class="table-field">Data zadania</td>
          <td>{{ task.date }}</td>
        </tr>
        <tr>
          <td class="table-field">Przedmiot zadania</td>
          <td>{{ task.subject }}</td>
        </tr>
        <tr>
          <td class="table-field">Opis zadania</td>
          <td>{{ task.description }}</td>
        </tr>
      </table>
      <h3>Nowa wersja:</h3>
      <form>
        <table>
          <tr>
            <th>Pole</th>
            <th>Wartość</th>
          </tr>
          <tr>
            <td class="table-field"><label for="nameField">Nazwa zadania</label></td>
            <td>
              <input
                id="nameField"
                type="text"
                :placeholder="task.title"
                v-model="formFields.NameField"
              />
            </td>
          </tr>
          <tr>
            <td class="table-field"><label for="dateField">Data zadania</label></td>
            <td>
              <input
                id="dateField"
                type="text"
                :placeholder="task.date"
                v-model="formFields.DateField"
              />
            </td>
          </tr>
          <tr>
            <td class="table-field"><label for="subjectField">Przedmiot zadania</label></td>
            <td>
              <input
                id="subjectField"
                type="text"
                :placeholder="task.subject"
                v-model="formFields.SubjectField"
              />
            </td>
          </tr>
          <tr>
            <td class="table-field"><label for="descriptionField">Opis zadania</label></td>
            <td>
              <input
                id="descriptionField"
                type="text"
                :placeholder="task.description"
                v-model="formFields.DescField"
              />
            </td>
          </tr>
        </table>
        <input type="submit" value="Wyślij" class="sendButton" @click="sendEdit" />
      </form>
    </div>
    <div v-else>
      <h2>Nie odnaleziono zadania od ID: {{ id }}</h2>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Edit",
  props: {
    id: String,
  },
  data() {
    return {
      task: Object,
      formFields: {
        NameField: "",
        DateField: "",
        SubjectField: "",
        DescField: "",
      },
    };
  },
  mounted() {
    axios
      .get("https://zsktasks-api.herokuapp.com/admin/all", {
        headers: { Authorization: `Bearer ${this.$store.state.loginToken}` },
      })
      .then((res) => {
        this.task = res.data.tasks.find((task) => task.id === this.id);
      });
  },
  methods: {
    sendEdit() {
      axios
        .post(
          "https://zsktasks-api.herokuapp.com/admin/edit_task",
          {
            title: this.formFields.NameField,
            description: this.formFields.DescField,
            subject: this.formFields.SubjectField,
            date: this.formFields.DateField,
            task_id: this.id,
          },
          { headers: { Authorization: `Bearer ${this.$store.state.loginToken}` } }
        )
        .then(() => {
          this.$router.push("/manage");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#edit {
  padding: 20px;
  overflow: auto;
  width: 100%;
  height: 100%;

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
