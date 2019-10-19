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
        <td>
          {{ task.title }}
        </td>
        <td>
          {{ task.description }}
        </td>
        <td>
          {{ task.subject }}
        </td>
        <td>
          {{ task.date }}
        </td>
        <td>
          {{ task.id }}
        </td>
        <td>
          <router-link :to="`/edit/${task.id}`">Edytuj</router-link>
        </td>
        <td>
          <a href="#" @click="deleteTask(task.id)">Usuń</a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from 'axios';

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
      axios.post('https://zsktasks-api.herokuapp.com/admin/delete_task', { task_id: id }, { headers: { Authorization: `Bearer ${this.$store.state.loginToken}` } }).then(res => console.log(res));
      this.getData();
    },
    getData() {
      axios.get('https://zsktasks-api.herokuapp.com/admin/all', { headers: { Authorization: `Bearer ${this.$store.state.loginToken}` } }).then((res) => {
        this.tasks = res.data.tasks;
      });
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
  td, tr {
    padding: 5px;
  }

  a {
    text-decoration: underline;
    color: black;
  }
}
</style>
