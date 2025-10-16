import { ref } from 'vue'
const authForm = () => {
  const username = ref('')
  const password = ref('')
  const errors = ref<string[]>([])
  const validate = () => {
    if (username.value.trim()) {
      errors.value.push('Nombre de usuario no puede estar vacio')
    }
  }
  return { username, password, validate, errors }
}

export default authForm
