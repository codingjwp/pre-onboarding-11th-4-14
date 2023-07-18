import axios from "axios";

const Options = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}

const httpClient = axios.create(Options);

export default httpClient;