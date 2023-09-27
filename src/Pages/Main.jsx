import React, { useState } from 'react';
import MainView from '../components/MainView';
import DogList from '../components/DogList';
import RecipeReviewCard from '../components/Mi';
import DogCard from '../components/Mi';
import { LinearProgress } from '@mui/material';


function App() {
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
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> */}
                {/* onUndo={...} */}
                {/* onUndo={...}  */}
                {/* <MainView currentDog={currentDog} onLike={onLike} onDislike={onDislike} isFetching={isFetching} setIsFetching={setIsFetching} /> */}
                <DogList dogs={likedDogs} title="Liked Dogs" />
                <DogCard currentDog={currentDog} onLike={onLike} onDislike={onDislike} isFetching={isFetching} setIsFetching={setIsFetching} isMain></DogCard>
                <DogList dogs={dislikedDogs} title="Disliked Dogs" />
            </div>
        </>

    );
}

export default App;
