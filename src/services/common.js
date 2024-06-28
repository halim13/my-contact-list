import axios from 'axios'

const baseURL = 'https://contact.herokuapp.com'

export default axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})
