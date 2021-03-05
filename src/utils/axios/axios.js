import axios from 'axios'

export default axios.create({
  baseUrl: 'http://localhost:4019',
  withCredentials: true,
});
