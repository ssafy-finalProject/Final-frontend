import axios from "axios";

const { VUE_REST_API_URL } = import.meta.env;

//Spring의 rest api axios 인스턴스

function RestAxios() {
  const instance = axios.create({
    baseURL: VUE_REST_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { RestAxios };
