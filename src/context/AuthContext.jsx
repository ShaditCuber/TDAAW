import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { setToken, getToken, deleteToken } from "../util/usuario";
import { useIniciarSesion } from "../queries/AuthQueries/queryLogin";
import { useMutation } from "@tanstack/react-query";
import clienteAxios from "../util/clienteAxios";
import { toast } from 'sonner';
import { useGetInfo } from "../queries/queries";

const UsuarioContext = createContext();

const UsuarioProvider = (props) => {


    const [usuario, setUsuario] = useState(null);
    const [rutaRedireccion, setRutaRedireccion] = useState(null);

    const { mutate, isLoading: cargandoUsuario } = useMutation(useIniciarSesion, {
        onSuccess: async (response) => {
            console.log(response, 'Response');
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
        },
        onError: (error) => {
            setToken(null);
        },
    });

    useEffect(() => {
        getUsuario();
    }, []);

    useEffect(() => {
        if (usuario) {
            if (!usuario?.perro_id) {
                window.location = "/seleccionar";
            }
            else {
                window.location = "/dashboard";
            }
        }
    }, [usuario]);

    const loginUsuario = async (form) => {
        mutate(form);
    };

    const getUsuario = async () => {
        console.log("Token actual:", getToken());
        if (!getToken()) {
            return;
        }
        try {
            const response = await clienteAxios.get("/user/info");
            console.log(response.data, 'Info');
            setUsuario(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    const logout = async () => {
        setUsuario(null);
        const { data } = await clienteAxios.get("auth/logout");
        deleteToken();
        window.location = "/";
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