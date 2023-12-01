import clienteAxios from "../../util/clienteAxios";


export const obtenerPerroAleatorio = async () => {
    const { data } = await clienteAxios.get('tinder/random');
    return data;
}

export const actualizarUsuario = async (perro_id) => {
    const { data } = await clienteAxios.post('user/actualizar?perro_id=' + perro_id);
    return data;
}

export const obtenerPerro = async (perro_id) => {
    const { data } = await clienteAxios.get('tinder/listar?id=' + perro_id);
    return data;
}

export const obtenerCandidato = async (perro_id) => {
    const { data } = await clienteAxios.get('tinder/candidatos?perro_interesado_id=' + perro_id);
    console.log(data)
    return data;
}


export const interaccion = async (perro_candidato_id,perro_interesado_id, preferencia) => {
    const { data } = await clienteAxios.post('tinder/interaccion?perro_interesado_id=' + perro_candidato_id + '&perro_candidato_id=' + perro_interesado_id + '&preferencia=' + preferencia);
    return data;
}

export const aceptados = async (perro_id) => { 
    const { data } = await clienteAxios.get('tinder/aceptados?id=' + perro_id);
    return data;
}

export const rechazados = async (perro_id) => { 
    const { data } = await clienteAxios.get('tinder/rechazados?id=' + perro_id);
    return data;
}