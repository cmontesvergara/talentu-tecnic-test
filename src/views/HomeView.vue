<script setup>
import { provide } from 'vue'
import { store } from "../store/store.js";
import Table from '@/components/Table.vue'
import FormControl from '@/components/FormControl.vue'

function getLocalUsers() {
  const talentuLocalUsers = JSON.parse(
    localStorage.getItem("talentuLocalUsers")
  );
  return talentuLocalUsers;
  
}
async function getUsers() {
  try {
    const r = await fetch("https://reqres.in/api/users?page=1").then(
      (response) => {
        return response.json();
      }
    );
    store.updateRemoteUsersState("requested");
    saveLocal(r.data);
    store.updateRemoteUsersState("saved");
  } catch (error) {
    console.log(error);
    store.updateRemoteUsersState("error");
  }
}
function saveLocal(params) {
  const talentuLocalUsers = {
    totalUsers: 0,
    users: [],
  };
  talentuLocalUsers.totalUsers = params.length;
  talentuLocalUsers.users = params;
  localStorage.setItem(
    "talentuLocalUsers",
    JSON.stringify(talentuLocalUsers)
  );
}
provide('homeFuntions', {
  getLocalUsers,getUsers,saveLocal
})

onMounted(() => {
  if (store.remoteUsersState == "unrequested") {
    getUsers();
  }
});
</script>

<template>
  <main >
  <FormControl/>
  <Table />
  </main>
</template>
<style scoped>
main{
  display: flex;
  flex-direction: column;
  /* cambia f direction pa media query */
  height: 99vh;
  width: 98vw;
  padding: 1rem;
  justify-content: flex-start;
  align-items: center;
}
@media (min-width:1024px) {
  main{
    flex-direction: row;
  }
}
</style>
