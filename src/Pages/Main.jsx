import React, { useState } from 'react';
import DogList from '../components/DogList';
import DogCard from '../components/Mi';
import TinderCard from 'react-tinder-card'

import {
    Button,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Box,
    Grid
} from "@mui/material";
export default function App() {
    const [likedDogs, setLikedDogs] = useState([]);
    const [dislikedDogs, setDislikedDogs] = useState([]);
    const [currentDog, setCurrentDog] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const onLike = (dog) => {
        if (isFetching) { return };
        setIsFetching(true);
        setLikedDogs((prevDogs) => [dog, ...prevDogs]);
        setIsFetching(false);
    };

    const onDislike = (dog) => {
        if (isFetching) { return };
        setIsFetching(true);
        setDislikedDogs((prevDogs) => [dog, ...prevDogs]);
        setIsFetching(false);
    };

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

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
    /*
    return (
        <TinderCard onSwipe={onSwipe} >

            hola
        </TinderCard>
    );*/

    return (
        <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={12} sm={4}>
                <Box
                    sx={{
                        width: 345,
                        height: 500 ,
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
                            height :'100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                        }}
                    >
                       
                        {likedDogs.map((dog, index) => (
                            <DogCard key={index} dogData={dog} arrepentirse={onArrepentirse} target={'disliked'}  />
                        ))}

                    </List>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <DogCard currentDog={currentDog} onLike={onLike} onDislike={onDislike} isFetching={isFetching} setIsFetching={setIsFetching} isMain></DogCard>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box
                    sx={{
                        width: 345,
                        height: 500,
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
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            '& ul': { padding: 0 },

                        }}
                        subheader={<li />}
                    >

                        {dislikedDogs.map((dog, index) => (
                            <DogCard key={index} dogData={dog} arrepentirse={onArrepentirse} target={'liked'} />
                        ))}

                    </List>
                </Box>
            </Grid>
        </Grid>
    )

    // return (
    //     <>
    //         <Grid
    //             container
    //             spacing={4}
    //             direction="row"
    //             justifyContent="center"
    //             alignItems="center">
    //             <Grid item xs={12} sm={4}>
    //                 <List sx={{
    //                     width: '100%',
    //                     maxWidth: 345,
    //                     bgcolor: 'background.paper',
    //                     position: 'relative',
    //                     overflow: 'auto',
    //                     maxHeight: 500,
    //                     '& ul': { padding: 0 },
    //                 }}>
    //                     <DogList dogs={likedDogs} title="Liked Dogs" />
    //                 </List>
    //                 {/* <DogList dogs={likedDogs} title="Liked Dogs" /> */}
    //             </Grid>
    //             <Grid item xs={12} sm={4}>
    //                 <DogCard currentDog={currentDog} onLike={onLike} onDislike={onDislike} isFetching={isFetching} setIsFetching={setIsFetching} isMain></DogCard>
    //             </Grid>
    //             <Grid item xs={12} sm={4}>
    //                 <List sx={{
    //                     width: '100%',
    //                     maxWidth: 345,
    //                     bgcolor: 'background.paper',
    //                     position: 'relative',
    //                     overflow: 'auto',
    //                     maxHeight: 500,
    //                     '& ul': { padding: 0 },
    //                 }}>
    //                     <DogList dogs={dislikedDogs} title="Disliked Dogs" />
    //                 </List>
    //                 {/* <DogList dogs={dislikedDogs} title="Disliked Dogs" /> */}
    //             </Grid>
    //         </Grid>
    //     </>
    // );



}

