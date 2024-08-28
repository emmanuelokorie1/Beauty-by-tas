import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://95.169.205.185:3200',
});

export default axiosInstance;
