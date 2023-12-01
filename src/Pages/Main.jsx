import { useState, useEffect } from 'react';
import DogCard from '../components/Mi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useUsuario } from "../context/AuthContext";
import { aceptados, actualizarUsuario, interaccion, obtenerCandidato, obtenerPerro, obtenerPerroAleatorio, rechazados } from "../queries/services/services";

import {
    Button,
    CircularProgress,
    List,
    Box,
    Grid,
    CardMedia
} from "@mui/material";
import { useLoadDog } from '../services/api';
import SeleccionarPerroModal from '../components/SeleccionarPerroModal';
import { set } from 'react-hook-form';
export default function Main() {
    const [likedDogs, setLikedDogs] = useState([]);
    const [dislikedDogs, setDislikedDogs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isCat, setIsCat] = useState(false);
    const [openedDescriptionDog, setOpenedDescriptionDog] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    let [perroUsuario, setPerroUsuario] = useState(null);
    const { usuario } = useUsuario();

    useEffect(() => {

        setLikedDogs(array_accept(usuario.perro_id));
        // console.log(usuario)
        const asignarPerro = async () => {
            if (usuario && usuario.perro_id === null) {
                setModalAbierto(true);
            } else {
                // console.log('else')
                const perro_user = await obtenerPerro(usuario.perro_id);
                setPerroUsuario(perro_user);
            }
        };
        asignarPerro();
    }, []);
    
    

    const onLike = (dog) => {
        if (isFetching) { return }
        interaccion(usuario.perro_id, dog.id,  'aceptado');
        setIsFetching(true);
        array_accept()
        // setLikedDogs((prevDogs) => [dog, ...prevDogs]);
        setTimeout(() => {
            setIsFetching(false);
        }, 1000);
        setShouldRefetch(true);
    };

    const onDislike = (dog) => {
        if (isFetching) { return }
        interaccion(usuario.perro_id, dog.id,'rechazado');
        setIsFetching(true);
        array_reject();
        // setDislikedDogs((prevDogs) => [dog, ...prevDogs]);
        setTimeout(() => {
            setIsFetching(false);
        }, 1000);
        setShouldRefetch(true);
    };

    async function array_accept() {
        try {
            let new_array = []
            const aceptados_array = await aceptados(usuario.perro_id);
            if (aceptados_array && Array.isArray(aceptados_array.aceptados)) {
                
                // recorerer los perros y cambiar sus keys
                for (let i = 0; i < aceptados_array.aceptados.length; i++) {
                    const dog = {
                        id: aceptados_array.aceptados[i].id,
                        name: aceptados_array.aceptados[i].nombre,
                        description: aceptados_array.aceptados[i].descripcion,
                        image: aceptados_array.aceptados[i].url_foto,
                    };
                    new_array.push(dog);
                }
                setLikedDogs(new_array);

            }
            return []; // Devuelve un array vacío si la respuesta no es válida
        } catch (error) {
            console.error("Error al obtener perros aceptados:", error);
            return []; // Devuelve un array vacío en caso de error
        }
    }

    async function array_reject() {
        try {
            let new_array = []
            const rechazados_array = await rechazados(usuario.perro_id);
            if (rechazados_array && Array.isArray(rechazados_array.rechazados)) {
                // recorerer los perros y cambiar sus keys
                for (let i = 0; i < rechazados_array.rechazados.length; i++) {
                    const dog = {
                        id: rechazados_array.rechazados[i].id,
                        name: rechazados_array.rechazados[i].nombre,
                        description: rechazados_array.rechazados[i].descripcion,
                        image: rechazados_array.rechazados[i].url_foto,
                    };
                    new_array.push(dog);
                }
                setDislikedDogs(new_array);
            }
            return []; // Devuelve un array vacío si la respuesta no es válida
        } catch (error) {
            console.error("Error al obtener perros rechazados:", error);
            return []; // Devuelve un array vacío en caso de error
        }
    }


    useEffect(() => {
        array_accept();
        array_reject();
        if (shouldRefetch) {
            refetch();
            setShouldRefetch(false);
        }
        
    }, [shouldRefetch]);

    let { data: dog, isLoading, refetch } = useLoadDog(usuario.perro_id,isCat)

    if (isLoading) { return <CircularProgress size="150px" /> }

    const onChange = () => {
        setIsCat(!isCat);
    };

    const abrirModal = () => {
        setModalAbierto(true);
    };

    const onArrepentirse = (dog, targetList) => {
        if (isFetching) { return }
        setIsFetching(true);
        // cerrar la descripción si está abierta
        if (dog.id === openedDescriptionDog) {
            setOpenedDescriptionDog(null);
        }
        if (targetList === 'disliked') {
            setLikedDogs((prevDogs) => prevDogs.filter((d) => d.name !== dog.name));
            setDislikedDogs((prevDogs) => [dog, ...prevDogs])
        } else {
            setDislikedDogs((prevDogs) => prevDogs.filter((d) => d.name !== dog.name));
            setLikedDogs((prevDogs) => [dog, ...prevDogs]);
        }

        setIsFetching(false);
    };

    const actualizarPerroUsuario = async (perroId) => {
        // Lógica para actualizar el perro del usuario en la base de datos
        await actualizarUsuario(perroId);
        const perroActualizado = await obtenerPerro(perroId);
        setPerroUsuario(perroActualizado);
    };

    return (

        <>
            <Box
                sx={{
                    backgroundColor: '#F7E0D3',
                    minHeight: '90vh',
                    padding: '1em',
                }}
            >
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{
                        color: '#D81B60',
                        fontWeight: 'bold',
                        marginBottom: '2em'
                    }}
                >
                    Tinder de {isCat ? "Gatitos" : "Perritos"}
                </Typography>
                {/* <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onChange()}
                    sx={{
                        margin: '20px',
                        borderColor: 'pink',
                        backgroundColor: 'white',
                        color: '#D81B60',
                        '&:hover': {
                            borderColor: 'green',
                            backgroundColor: 'green',
                            color: 'white',
                            transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.3s',

                    }}
                >
                    {isCat ? "Cambiar a Perrito" : "Cambiar a Gatito"}            </Button> */}
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>Candidato</Typography>
                        <div style={{ width: '40vh', height: '50vh', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                            {isFetching ? <CircularProgress size="150px" /> :
                                <DogCard dog={dog} onLike={onLike} onDislike={onDislike} isFetching={isFetching} setIsFetching={setIsFetching} isMain></DogCard>
                            }
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>Me gusta</Typography>
                        <Box
                            sx={{
                                width: '40vh',
                                height: '50vh',
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                            <List
                                sx={{
                                    border: '1px solid black',
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: '#F7E0D3',
                                    position: 'relative',
                                    overflow: 'auto',
                                }}
                                subheader={<li />}
                            >

                                {likedDogs.map((dog, index) => (
                                    <DogCard key={index} dog={dog} arrepentirse={onArrepentirse} target={'disliked'} openedDescriptionDog={openedDescriptionDog} setOpenedDescriptionDog={setOpenedDescriptionDog} />
                                ))}

                            </List>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>No me gusta</Typography>
                        <Box
                            sx={{
                                width: '40vh',
                                height: '50vh',
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                            <List
                                sx={{
                                    border: '1px solid black',
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: '#F7E0D3',
                                    position: 'relative',
                                    overflow: 'auto',
                                    '& ul': { padding: 0 },

                                }}
                                subheader={<li />}
                            >
                                {dislikedDogs.map((dog, index) => (
                                    <DogCard key={index} dog={dog} arrepentirse={onArrepentirse} target={'liked'} openedDescriptionDog={openedDescriptionDog} setOpenedDescriptionDog={setOpenedDescriptionDog} />
                                ))}

                            </List>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={5} alignItems="center" justifyContent="center" p={5}>
                    <Grid item>
                        <Typography variant="h3" align="center"  sx={{ color: 'black', fontWeight: 'bold' }}>Tu Perrito</Typography>
                    </Grid>
                    <Grid item>
                        
                        {perroUsuario && (
                            <>
                                <Typography variant="h6" color='black'>{perroUsuario.perro.nombre}</Typography>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 100, height: 100, borderRadius: '50%' }}
                                    image={perroUsuario.perro.url_foto}
                                    alt={`Imagen de ${perroUsuario.perro.id}`}
                                />
                            </>
                        )}
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={abrirModal}>
                            Cambiar mi perro
                        </Button>
                    </Grid>
                </Grid>

            </Box>
            <SeleccionarPerroModal
                abierto={modalAbierto}
                cerrarModal={() => setModalAbierto(false)}
                perroActual={perroUsuario}
                setPerroUsuario={setPerroUsuario}
                actualizarUsuario={actualizarPerroUsuario}
            />
        </>

    )



}


