import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, CircularProgress, LinearProgress } from '@mui/material';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import zIndex from '@mui/material/styles/zIndex';
import { useLoadDog } from '../services/api';
import { generateRandomName } from '../util';
import { a } from '@react-spring/web';






export default function DogCard({ onLike, onDislike, isFetching, setIsFetching, isMain, dogData, arrepentirse, target }) {
    const [expanded, setExpanded] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    /*
    const fetchDog = async () => {
        setIsLoadingImage(true);

        const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
        console.log(data)
        // const { data } = await axios.get('https://api.thecatapi.com/v1/images/search');
        setTimeout(() => {
            setIsLoadingImage(false);
        }, 1000);
        return data;
    };

    const { data, isLoading, refetch , isError } = useQuery(['currentDog'], fetchDog, { refetchOnWindowFocus: false });

    
    useEffect(() => {
        refetch();
    }, [onLike, onDislike]);

    if (isLoading) return <LinearProgress />;

    let dog = {
        name: generateRandomName(),
        image: data.message,
        // image: data[0].url,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };

    
    */
    useEffect(() => {
        refetch();
    }, [onLike, onDislike]);

    const [isCat, setIsCat] = useState(false);
    let { data: dog, isLoading, refetch } = useLoadDog(isCat)

    if (isLoading) return <LinearProgress />;
    if (dogData) {
        dog = dogData;
    }

    const onChange = () => {
        setIsCat(!isCat);
    };





    const styles = isMain ? { width: 345, height: 500, position: 'relative', borderRadius: '70px', maxWidth: 346 } : { maxWidth: 345, height: 300, position: 'relative', marginBottom: '20px' }

    const fontSizeResponsive = isMain ? 'h2' : 'h6';
    return (
        <>
            {isLoading && <CircularProgress />}
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
            <Card sx={styles}>

                <CardMedia
                    component="img"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                    }}
                    image={dog.image}
                    alt="Error al cargar la imagen"
                />

                <CardContent
                    sx={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2
                    }}
                >
                    <Typography variant={fontSizeResponsive} color="white" sx={{ fontWeight: 'bold' }}>
                        {dog.name}
                    </Typography>
                    <Typography variant="body2" color="white" sx={{ fontWeight: 'medium' }}>
                        {dog.description}
                    </Typography>
                </CardContent>

                {isMain ? <CardActions
                    disableSpacing
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        zIndex: 2,
                        padding: '15px'
                    }}
                >
                    <IconButton
                        aria-label="like"
                        onClick={() => onLike(dog)}
                        disabled={isLoadingImage}
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
                        <FavoriteIcon style={{ fontSize: 60 }} />
                    </IconButton>
                    <IconButton
                        aria-label="dislike"
                        onClick={() => onDislike(dog)}
                        disabled={isLoadingImage}
                        sx={{
                            color: 'red',
                            backgroundColor: 'gray',
                            '&:hover': {
                                color: 'red',
                                fontSize: '100px',
                                backgroundColor: 'white',

                            },
                            marginRight: '30px'

                        }}
                    >
                        <CloseIcon style={{ fontSize: 60 }} />
                    </IconButton>
                </CardActions>
                    :
                    <IconButton sx={
                        {
                            zIndex: 2,
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            color: 'red',
                            background: 'gray',
                        }

                    }
                        onClick={() => arrepentirse(dog, target)}
                    >

                        Arrepentirse
                    </IconButton>

                }

            </Card>
        </>

    );
}
