import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { setToken, getToken, deleteToken } from "../util/usuario";
import { useIniciarSesion } from "../queries/AuthQueries/queryLogin";
import { useMutation } from "@tanstack/react-query";
import clienteAxios from "../util/clienteAxios";

const UsuarioContext = createContext();

const UsuarioProvider = (props) => {


    const [usuario, setUsuario] = useState(null);
    const [rutaRedireccion, setRutaRedireccion] = useState(null);

    const { mutate, isLoading: cargandoUsuario } = useMutation(useIniciarSesion, {
        onSuccess: async (response) => {
            console.log(response, 'Response');
            const {token } = response;
            if (token) {
                setToken(token);
            }
            await getUsuario();
            window.location = "/dashboard";
        },
        onError: (error) => {
            setToken(null);
        },
    });

    useEffect(() => {
        getUsuario();
    }, []);

    useEffect(() => {
        if (rutaRedireccion) {
            window.location = rutaRedireccion;
        }
    }, [rutaRedireccion]);

    const loginUsuario = async (form) => {
        mutate(form);
    };

    const getUsuario = async () => {
        console.log("Token actual:", getToken()); // Agregar esta línea
        if (!getToken()) {
            return;
        }
        console.log("No hay token")
        try {
            const { data } = await clienteAxios.get("user/info");
            setUsuario(data);
            console.log(data)
            if (!data.perro_id) {
                setRutaRedireccion("/seleccionar_perro");
            } else {
                setRutaRedireccion("/dashboard");
            }
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