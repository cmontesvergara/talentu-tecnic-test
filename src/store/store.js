import { reactive } from 'vue'

export const store = reactive({
  formState: 'incompleted',// incompleted,completed, loading, error, sucess
  remoteUsersState:'unrequested',// unrequested, requested, saved,error,
  updateFormState(value) {
    this.formState = value;
  },
  updateRemoteUsersState(value) {
    this.remoteUsersState = value;
  },
})