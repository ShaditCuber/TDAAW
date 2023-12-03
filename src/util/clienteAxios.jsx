import axios from "axios";
import { getToken } from "./usuario";

const clienteAxios = axios.create({
    baseURL: "http://127.0.0.1:8080/api/",
});

clienteAxios.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (token) {
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        console.log('error', error);
        if (error.response.status === 401) {
            window.location = "/";
        }
        return Promise.reject(error);
    }
);

clienteAxios.interceptors.response.use(
    function (response) {
        if (response.data.codigo === 401 || response.data.status === "Token is Expired") {
            window.location = "/";
        }

        if (response.data.codigo === 403) {
            //error de permisos
        }
        

        return response;
    },
    function (error) {
        console.log(error);
        if (error.response.status === 400) {
            window.location = "/";
        } else {
            return Promise.reject(error);
        }
    }
);


export default clienteAxios;