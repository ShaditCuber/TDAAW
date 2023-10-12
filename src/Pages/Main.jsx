import React, { useState, useEffect } from 'react';
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
export default function App() {
    const [likedDogs, setLikedDogs] = useState([]);
    const [dislikedDogs, setDislikedDogs] = useState([]);
    const [currentDog, setCurrentDog] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isCat, setIsCat] = useState(false);
    const [openedDescriptionDog, setOpenedDescriptionDog] = useState(null);



    const onLike = (dog) => {
        if (isFetching) { return };
        setIsFetching(true);
        setLikedDogs((prevDogs) => [dog, ...prevDogs]);
        setTimeout(() => {
            setIsFetching(false);
        }, 1000);
        setShouldRefetch(true);
    };

    const onDislike = (dog) => {
        if (isFetching) { return };
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
        if (isFetching) { return };
        setIsFetching(true);

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
                    Tinder de Perritos
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<ExpandMoreIcon />}
                    onClick={() => onChange()}
                    sx={{
                        margin: '20px',
                        borderColor: 'pink',
                        '&:hover': {
                            borderColor: 'green',
                            backgroundColor: 'green',
                            color: 'white',
                        },
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
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
                        <Typography variant="h5" align="center" gutterBottom>Candidato</Typography>
                        <div style={{ width: '40vh', height: '50vh', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                            {isFetching ? <CircularProgress size="150px" /> :
                                <DogCard dog={dog} onLike={onLike} onDislike={onDislike} isFetching={isFetching} setIsFetching={setIsFetching} isMain></DogCard>
                            }
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5" align="center" gutterBottom>Me gusta</Typography>
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
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: '#242424',
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
                        <Typography variant="h5" align="center" gutterBottom>No me gusta</Typography>
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
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: '#242424',
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

