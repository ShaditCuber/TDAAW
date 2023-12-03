import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { setToken, getToken, deleteToken } from "../util/usuario";
import { useIniciarSesion } from "../queries/AuthQueries/queryLogin";
import { useMutation } from "@tanstack/react-query";
import clienteAxios from "../util/clienteAxios";
import { get } from "react-hook-form";

const UsuarioContext = createContext();

const UsuarioProvider = (props) => {


    const [usuario, setUsuario] = useState(null);



    const { mutate, isLoading: cargandoUsuario } = useMutation(useIniciarSesion, {
        onSuccess: (response) => {
            console.log(response);
            setToken(response.token);
            getUsuario();
            window.location = "/";
        },
        onError: (error) => {
            setToken(null);
        },
    });

    useEffect(() => {
        getUsuario();
    }, []);

    const loginUsuario = async (form) => {
        mutate(form);
    };

    const getUsuario = async () => {
        console.log("Token actual:", getToken()); // Agregar esta línea
        if (!getToken()) {
            return;
        }
        try {
            const { data } = await clienteAxios.get("user/info");
            setUsuario(data);
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
            logout
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