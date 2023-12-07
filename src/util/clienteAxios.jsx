import axios from "axios";
import { getToken } from "./usuario";

const clienteAxios = axios.create({
    // baseURL: "http://localhost:8001/api/",
    baseURL: "http://localhost:8080/api/",

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
        if (error.response.status === 401) {
            window.location = "/login";
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
        if (error.response.status === 401) {
            window.location = "/login";
        } else {
            return Promise.reject(error);
        }
    }
);

// documentacion de interceptors --> https://axios-http.com/docs/interceptors

export default clienteAxios;