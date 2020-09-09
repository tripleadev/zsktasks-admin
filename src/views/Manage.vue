<template>
  <div id="manage">
    <h1>zarządzaj zadaniami.</h1>
    <table id="tasksTable">
      <tr>
        <th>Nazwa zadania</th>
        <th>Treść</th>
        <th>Przedmiot</th>
        <th>Data</th>
        <th>ID zadania</th>
        <th>Edytuj</th>
        <th>Usuń</th>
      </tr>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>{{ task.subject }}</td>
        <td style="white-space: nowrap;">{{ format(task.date) }}</td>
        <td>{{ task._id }}</td>
        <td>
          <router-link :to="`/edit/${task._id}`">Edytuj</router-link>
        </td>
        <td>
          <a href="#" @click="deleteTask(task._id)">Usuń</a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
import { format as lightDate } from 'light-date';

export default {
  name: 'Manage',
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    deleteTask(id) {
      axios.post(`https://zsktasks-api.herokuapp.com/tasks/${id}`, {
        headers: { Authorization: `Bearer ${this.$store.state.loginToken}` },
      });
      this.getData();
    },
    getData() {
      axios
        .get('https://zsktasks-api.herokuapp.com/tasks/all', {
          headers: { Authorization: `Bearer ${this.$store.state.loginToken}` },
        })
        .then((res) => {
          this.tasks = res.data.tasks;
        });
    },
    format(date) {
      return lightDate(new Date(date), `{yyyy}-{MM}-{dd}`);
    },
  },
};
</script>
<style lang="scss">
#manage {
  padding: 20px;
  overflow: auto;
  width: 100%;
  height: 100%;

  h1 {
    font-size: 50px;
  }
}

#tasksTable {
  td,
  tr {
    padding: 5px;
  }

  a {
    text-decoration: underline;
    color: black;
  }
}
</style>
