
<script setup>
import { store } from "../store/store.js";
import { ref, onMounted,inject } from "vue";


const { getLocalUsers, getUsers,saveLocal} = inject('homeFuntions')

const tempUsr = ref({
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  birthday: null,
  avatar: null,
});
function saveUser() {
  if (store.formState == "completed") { // validation of form state
    store.updateFormState("loading");// set state for animation
    
    setTimeout(() => {

      const localData = getLocalUsers();
      tempUsr.value.id = localData.totalUsers + 1;
      localData.users.push(tempUsr.value);
      saveLocal(localData.users);   // call save Function
      store.updateFormState("sucess"); // set state for animation
      
      setTimeout(() => {
        clearForm();
        store.updateFormState("incompleted");
      }, 1500);
    
    }, 1000);

  }else{
      store.updateFormState("error");
      setTimeout(() => store.updateFormState("incompleted"), 2000);
  }
}
function clearForm() {
  tempUsr.value.id = null;
  tempUsr.value.email = null;
  tempUsr.value.first_name = null;
  tempUsr.value.last_name = null;
  tempUsr.value.birthday = null;
  tempUsr.value.avatar = null;
}



function setStateForm() {
  if (
    tempUsr.value.email != null &&
    tempUsr.value.first_name != null &&
    tempUsr.value.last_name != null &&
    tempUsr.value.birthday != null
  ) {
    //console.log(store.formState);
    store.updateFormState("completed");
  } else {
    //console.log(store.formState);
    store.updateFormState("incompleted");
  }
}



</script>
<template>
  <div class="container">
    <form class="main-form" v-on:submit.prevent="saveUser">
      <label for="">Nuevo Usuario</label>
      <input
        v-model="tempUsr.email"
        class="inputs"
        type="email"
        placeholder="Correo Electronico"
        v-on:change="setStateForm"
      />
      <input
        v-model="tempUsr.first_name"
        class="inputs"
        type="text"
        placeholder="Nombre"
        v-on:change="setStateForm"
      />
      <input
        v-model="tempUsr.last_name"
        class="inputs"
        type="text"
        placeholder="Apellido"
        v-on:change="setStateForm"
      />
      <span class="sub-label">fecha de nacimiento</span>
      <input
        v-model="tempUsr.birthday"
        class="inputs"
        type="date"
        v-on:change="setStateForm"
      />
      <button class="submit-button" type="submit">
        Aceptar
      </button>
      <i
        v-if="store.formState == 'loading'"
        class="bx bx-loader-alt bx-spin loading"
      ></i>

      <i v-if="store.formState == 'error'" class="bx bx-error-alt"></i>
      <p v-if="store.formState == 'error'">Error</p>
      <i
        v-if="store.formState == 'sucess'"
        class="bx bx-check-shield bx-sm"
      ></i>
      <p v-if="store.formState == 'sucess'">Creado</p>
    </form>
  </div>
</template>
<style>
.sub-label {
  display: flex;
  width: 100%;
  color: gray;
  font-size: 0.8rem;
  text-align: left;
  transform: translateY(10px);
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  /* cambia wid pa media query */
  height: 100%;
  padding: 1rem;
}

.main-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: min-content;
  padding: 1rem;
  box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.258);
  border-radius: 0.5rem;
}
.inputs {
  display: flex;
  width: 100%;
  margin: 0.5rem;
  height: 2.5rem;
  border: none;
  border-bottom: solid 0.01px gray;
  color: gray;
}
.inputs:focus {
  outline: none;
  border-bottom: solid 0.01px black;
}
.inputs::placeholder {
  color: gray;
}
.submit-button {
  display: flex;
  width: 100%;
  height: min-content;
  border-radius: 0.3rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 1rem;
}
.submit-button:active {
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.194);
}

@media (min-width:1024px) {
  .container{
    width: 40%;
  }
}
</style>