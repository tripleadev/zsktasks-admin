<template>
  <div class="addForm">
    <h2>Dodaj nowy wpis do tabeli</h2>
    <form>
      <div>
        <input
          type="text"
          name="date"
          id="dateInput"
          placeholder="Data w formacie RRRR-MM-DD"
          v-model="dateInput"
        />
      </div>
      <div>
        <!-- eslint-disable-next-line -->
        <input
          type="text"
          name="person"
          id="personInput"
          placeholder="Imię i nazwisko osoby"
          v-model="personInput"
        />
      </div>
      <div>
        <textarea
          name="comment"
          id="commentInput"
          rows="6"
          placeholder="Komentarz (opcjonalne)"
          v-model="commentInput"
        ></textarea>
      </div>
      <div>
        <input type="submit" value="Wyślij" @click="sendSchedule" />
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "addScheduleForm",
  data() {
    return {
      dateInput: "",
      personInput: "",
      commentInput: "",
    };
  },
  methods: {
    sendSchedule(e) {
      e.preventDefault();
      axios
        .post(
          "https://zsktasks-api.herokuapp.com/notebookSchedule/",
          {
            date: this.dateInput,
            name: this.personInput,
            comment: this.commentInput,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.loginToken}`,
            },
          }
        )
        .then((res) => {
          // eslint-disable-next-line
          alert(res.data.message);
          this.$emit("reloadData");
        })
        .catch((err) => {
          // eslint-disable-next-line
          alert(err.response.data.error || err.response.data.message);
        });
    },
  },
};
</script>
