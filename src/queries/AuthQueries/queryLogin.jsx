import clienteAxios from "../../util/clienteAxios";


export const useIniciarSesion = async (form) => {
    console.log(form);
    const { data } = await clienteAxios.post('auth/login', form);
    return data;
}