<script setup>
import { inject, onActivated, watch, ref } from "vue";
import { store } from "../store/store.js";
const { getLocalUsers } = inject("homeFuntions");

let base = ref({});

watch(
  () => store.formState,
  (formState) => {
    if (formState == "sucess") {
      updateUserList();
    }
  }
);

function updateUserList() {
  base.value = getLocalUsers();
  for (const key in base.value.users) {
    console.log(base.value.users[key]);
    if (base.value.users[key].birthday) {
      base.value.users[key].age = getAge(base.value.users[key].birthday);
    } else {
      base.value.users[key].age = " ";
    }
  }
}

function getAge(date) {
  let today = new Date();
  let birthday = new Date(date);
  let age = today.getFullYear() - birthday.getFullYear();
  let difMonth = today.getMonth() - birthday.getMonth();
  if (
    difMonth < 0 ||
    (difMonth === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }
  return age;
}

onActivated(() => {
  updateUserList();
});
</script>

<template >
  <div class="container">
    <table class="main-table">
      <thead class="main-head">
        <tr class="head-row">
          <th class="head-item">ID</th>
          <th class="head-item">NOMBRE</th>
          <th class="head-item">EDAD</th>
          <th class="head-item">EMAIL</th>
        </tr>
      </thead>
      <tbody class="main-body">
        <tr class="body-row" v-for="user in base.users" :key="user.id">
          <td class="body-item">{{ user.id }}</td>
          <td class="body-item to-start center-text">
            {{ `${user.first_name} ${user.last_name}` }}
          </td>
          <td class="body-item">{{ user.age }}</td>
          <td class="body-item to-start">{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  /* cambia wid pa meday query */
  height: 100%;
  padding: 1rem;
}
.main-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: .5rem; */
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.085);
  border-radius: 0.2rem;
}
.main-head,
.main-body {
  display: flex;
  width: 100%;
  background-color: rgba(134, 137, 134, 0);
}
.main-body {
  flex-direction: column;
}
.head-row,
.body-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.head-row {
  border: solid 1px black;
  background-color: rgba(128, 128, 128, 0.081);
}
.body-row {
  border-right: solid 1px black;
  border-left: solid 1px black;
  border-bottom: solid 0.01px gray;
}
.head-item,
.body-item {
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 25%;
  font-size: 0.9rem;
  overflow-x: auto;
  text-align: center;
}
.to-start {
  justify-content: flex-start;
}

@media (min-width: 1024px) {
  .body-item {
    font-size: 1rem;
  }
  .center-text {
    justify-content: center;
  }
  .body-item {
    align-items: center;
  }
}
</style>
