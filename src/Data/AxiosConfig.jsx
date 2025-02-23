import axios from 'axios';

// Set axios base URL and credentials
const axiosInstance = axios.create({
  baseURL: 'https://backend.qseer.app/api/seer',
  withCredentials: true, // Ensure that cookies are sent with requests
});

export default axiosInstance;
