import React, { useState, useRef, useMemo, useEffect } from 'react';
// import DogList from '../components/DogList';
import DogCard from '../components/Mi';
import TinderCard from 'react-tinder-card'
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Button,
    Divider,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
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
    if (isLoading) {return <CircularProgress size="150px"/>}
    
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

    const swiped = (direction, nameToDelete, index) => {
        console.log(direction)
    }


    return (

        <>
            <IconButton
                aria-label="like"
                onClick={() => onChange()}
                sx={{
                    backgroundColor: 'gray',

                    color: 'pink',
                    '&:hover': {
                        color: 'green',
                        fontSize: '100px',
                        backgroundColor: 'white ',

                    }
                }}
            >
                <ExpandMoreIcon style={{ fontSize: 60 }} />
            </IconButton>
            <Grid
                container
                spacing={4}
                direction="row"
                justifyContent="center"
                alignItems="center">

                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            width:  '40vh',
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
                                <DogCard key={index} dog={dog} arrepentirse={onArrepentirse} target={'disliked'} />
                            ))}

                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div style={{ width: '40vh', height: '50vh', display: 'flex', textAlign :  'center' , justifyContent : 'center'}}>
                        {isFetching ? <CircularProgress size="150px"/> :
                            <DogCard dog={dog} onLike={onLike} onDislike={onDislike} isFetching={isFetching} setIsFetching={setIsFetching} isMain></DogCard>
                        }
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
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
                                <DogCard key={index} dog={dog} arrepentirse={onArrepentirse} target={'liked'} />
                            ))}

                        </List>
                    </Box>
                </Grid>
            </Grid>

        </>

    )



}

