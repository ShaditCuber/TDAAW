import { useState, useEffect } from 'react';
import DogCard from '../components/Mi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import {
    Button,
    CircularProgress,
    List,
    Box,
    Grid
} from "@mui/material";
import { useLoadDog } from '../services/api';
export default function Main() {
    const [likedDogs, setLikedDogs] = useState([]);
    const [dislikedDogs, setDislikedDogs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isCat, setIsCat] = useState(false);
    const [openedDescriptionDog, setOpenedDescriptionDog] = useState(null);



    const onLike = (dog) => {
        if (isFetching) { return }
        setIsFetching(true);
        setLikedDogs((prevDogs) => [dog, ...prevDogs]);
        setTimeout(() => {
            setIsFetching(false);
        }, 1000);
        setShouldRefetch(true);
    };

    const onDislike = (dog) => {
        if (isFetching) { return }
        setIsFetching(true);
        setDislikedDogs((prevDogs) => [dog, ...prevDogs]);
        setTimeout(() => {
            setIsFetching(false);
        }, 1000);
        setShouldRefetch(true);
    };

    useEffect(() => {
        if (shouldRefetch) {
            refetch();
            setShouldRefetch(false);
        }
    }, [shouldRefetch]);

    let { data: dog, isLoading, refetch } = useLoadDog(isCat)
    if (isLoading) { return <CircularProgress size="150px" /> }

    const onChange = () => {
        setIsCat(!isCat);
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
                <Button
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
                    {isCat ? "Cambiar a Perrito" : "Cambiar a Gatito"}            </Button>
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
            </Box>
        </>

    )



}

