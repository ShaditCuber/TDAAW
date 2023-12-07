import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { setToken, getToken, deleteToken } from "../util/usuario";
import { useIniciarSesion } from "../queries/AuthQueries/queryLogin";
import { useMutation } from "@tanstack/react-query";
import clienteAxios from "@util/clienteAxios";
import { toast } from 'sonner';

const UsuarioContext = createContext();

const UsuarioProvider = (props) => {


    const [usuario, setUsuario] = useState(null);
    const [login, setLogin] = useState(false);

    const { mutate, isLoading: cargandoUsuario } = useMutation(useIniciarSesion, {
        onSuccess: async (response) => {
            const error = response?.error;
            if (error) {
                toast.error(error);
                return;
            }
            const { token } = response;
            if (token) {
                setToken(token);
            }
            getUsuario();
            setLogin(true);
        },
    });

    useEffect(() => {
        getUsuario();
    }, []);

    useEffect(() => {
        if (login) {
            if (!usuario?.perro_id) {
                window.location = "/seleccionar";
            }
            else {
                window.location = "/";
            }
            setLogin(false);
        }
    }, [usuario]);

    const loginUsuario = async (form) => {
        mutate(form);
    };

    const getUsuario = async () => {
        if (!getToken()) {
            return;
        }
        try {
            const response = await clienteAxios.get("/user/info");
            console.log(response.data, 'Info');
            if (response.data.status === "Token is Expired") {
                deleteToken();
                window.location = "/login";
                return;
            }
            setUsuario(response.data);
        } catch (error) {
            window.location = "/login";
        }
    };


    const logout = async () => {
        setUsuario(null);
        deleteToken();
        const { data } = await clienteAxios.get("auth/logout");
        window.location = "/login";
    };

    const value = useMemo(() => {
        return {
            usuario,
            cargandoUsuario,
            loginUsuario,
            logout,
        };
    }, [usuario, cargandoUsuario, loginUsuario, logout]);

    return <UsuarioContext.Provider
        value={value}
        {...props}
    />;
};

const useUsuario = () => {
    return useContext(UsuarioContext);
};

export { UsuarioProvider, useUsuario };