import React, { useState } from 'react';
import DogList from '../components/DogList';
import DogCard from '../components/Mi';
import {
    Button,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Box
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
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
                />
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
                />
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

