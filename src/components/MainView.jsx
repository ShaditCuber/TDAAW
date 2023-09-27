import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardMedia, CardActions, Button, Typography, CardContent, LinearProgress } from '@mui/material';
import { useEffect } from 'react';

const fetchDog = async () => {
    const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
    return data;
};

const generateRandomName = () => {
    return Math.random().toString(36).substring(2, 8);
};

function MainView({ onLike, onDislike, isFetching, setIsFetching }) {
    const { data, isLoading, refetch } = useQuery(['currentDog'], fetchDog, { refetchOnWindowFocus: false, onSuccess: () => setIsFetching(false) },);

    useEffect(() => {
        refetch();
    }, [onLike, onDislike]);



    const dog = {
        name: generateRandomName(),
        image: data.message,
        description: 'Lorem ipsum...'  
    };

    return (
        <Card>
            <CardMedia component="img" alt="Random Dog" height="300" image={dog.image} />
            <CardContent>
                <Typography variant="h5">{dog.name}</Typography>
                <Typography variant="body2">{dog.description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => onLike(dog)} disabled={isLoading || isFetching}>
                    Me gusta
                </Button>
                <Button variant="contained" color="secondary" onClick={() => onDislike(dog)} disabled={isLoading || isFetching}>
                    No me gusta
                </Button>
            </CardActions>
        </Card>
    );
}

export default MainView;
