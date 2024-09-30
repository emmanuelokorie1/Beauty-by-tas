import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://c92109da85c626a82626328ae52584a0.serveo.net',
  baseURL: 'http://95.169.205.185:3200',
});

export default axiosInstance;
