import axios from "axios";

const Options = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}

const httpClient = axios.create(Options);

export default httpClient;