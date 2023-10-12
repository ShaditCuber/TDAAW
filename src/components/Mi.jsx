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
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, CircularProgress, LinearProgress } from '@mui/material';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import zIndex from '@mui/material/styles/zIndex';
import { useLoadDog } from '../services/api';
import { generateRandomName } from '../util';
import { a } from '@react-spring/web';






export default function DogCard({ onLike, onDislike , isMain, dog, arrepentirse, target }) {

    //const styles = isMain ? { width: 400, height: 500, position: 'relative', borderRadius: '10px', maxWidth: 400 } : { maxWidth: 345, height: 400, position: 'relative', marginBottom: '20px' }
    const styles = isMain
    ? { width: "100%", height: '100%', position: 'relative', borderRadius: '10px', maxWidth: '100%' }
    : { width: "100%", height: '90%', position: 'relative', marginBottom: '5px'}; // Cambia maxWidth según tus necesidades

    const [showDescription, setShowDescription] = useState(false);  
    const fontSizeResponsive = isMain ? 'h2' : 'h6';
    return (
        <>
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
                        display: 'inline-block',
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
                    zIndex: 2,
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" color="white" sx={{ fontWeight: 'bold' }}>
                        {dog.name}
                    </Typography>
                    <IconButton
                        onClick={() => setShowDescription(!showDescription)}
                        sx={{
                            color: 'white',
                        }}
                    >
                            {(showDescription || isMain)? (
                            <ArrowDropUpOutlinedIcon style={{ fontSize: 60 }} />
                        ) : (
                            <ArrowDropDownOutlinedIcon style={{ fontSize: 60 }} />
                        )}
                    </IconButton>
                </div>
                    {(showDescription || isMain)&& (
                    <Typography variant="body2" color="white" sx={{ fontWeight: 'medium' }}>
                        {dog.description}
                    </Typography>
                )}
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
                        sx={{
                            

                            color: '#c06d84',
                            '&:hover': {
                                color: '#E04D4D',
                                fontSize: '100px',

                            }
                        }}
                    >
                        <FavoriteIcon style={{ fontSize: 60 }} />
                    </IconButton>
                    <IconButton
                        aria-label="dislike"
                        onClick={() => onDislike(dog)}
                        sx={{
                            color: '#afded7',
                            '&:hover': {
                                color: '#E04D4D',
                                fontSize: '100px',
                            },
                            marginRight: '30px'

                        }}
                    >
                        <HeartBrokenIcon style={{ fontSize: 60 }} />
                    </IconButton>
                </CardActions>
                    :
                    <IconButton sx={
                        {
                            zIndex: 1,
                            position: 'absolute',
                            bottom: 0,
                            width: '30%',
                            color: '#1B7CD2',
                            '&:hover': {
                                color: '#E04D4D',
                                fontSize: '100px',

                            },
                        }

                    }
                        onClick={() => arrepentirse(dog, target)}
                    >
                        <SwapHorizIcon style={{ fontSize: 60 }} />
                    </IconButton>

                }
            </Card>
        </>

    );
}
