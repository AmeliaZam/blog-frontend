export const validateLogin = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/i.test(values.password)) {
    errors.password = 'Enter at least one numeric digit, uppercase and lowercase letter'
  }
  return errors
}

export const validateArticle = (values) => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.content) {
    errors.content = 'Required'
  }
  if (!values.status) {
    errors.status = 'Required'
  }

  return errors
}
