import { ref } from 'vue'
//aqui iria el validateusername 
const authForm = () => {
  const username = ref('')
  const password = ref('')
  const errors = ref<string[]>([])

  const validate = () => {
    errors.value= []
    if (username.value === '') {
      errors.value.push('Nombre de usuario no puede estar vacío')
      return
    }

    if (password.value === '') {
      errors.value.push('Contraseña no puede estar vacía')
      return
    }
  }

  return { username, password, validate, errors }
}

export default authForm

