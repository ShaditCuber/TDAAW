import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Box, CardActions, CircularProgress } from "@mui/material";
import { actualizarUsuario, obtenerPerro, obtenerPerroAleatorio } from "@queries/queries";

const SeleccionarPerro = () => {

    const [perro, setPerro] = useState(null);
    const [actualizando, setActualizando] = useState(false);

    const cargarPerroAleatorio = async () => {
        setPerro(null);
        const perroAleatorio = await obtenerPerroAleatorio();
        const perro = await obtenerPerro(perroAleatorio.perro.id)
        const url_foto = perro.perro.url_foto;
        const img = new Image();
        img.src = url_foto;
        img.onload = () => {
            setPerro(perro.perro);
        }
        img.onerror = () => {
            cargarPerroAleatorio();
        }
    };

    const aceptarPerro = async () => {
        setActualizando(true);
        await actualizarUsuario(perro.id);
        window.location = "/";
    };



    useEffect(() =>  {
        cargarPerroAleatorio();
    }, []);


    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: "100vh", width: '400px' }}>
            {perro && !actualizando ? (
                <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 4, boxShadow: 24 }}> 
                    <Typography variant="h6" align="center" sx={{ marginBottom: '20px', color: 'black' }}>
                        Registra a tu Perro Favorito para comenzar a buscarle pareja
                    </Typography>
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{
                                width: '100%', 
                                objectFit: 'cover',
                                maxHeight: '600px'
                            }}
                            image={perro.url_foto}
                            alt={`Imagen de ${perro.nombre}`}
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ padding: '10px' }}>
                            {perro.nombre}
                        </Typography>
                        <CardActions>
                            <Button size="small" color="primary" onClick={aceptarPerro}>
                                Aceptar este Perro
                            </Button>
                            <Button size="small" color="secondary" onClick={cargarPerroAleatorio}>
                                Ver Otro Perro
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            ) : (
                <CircularProgress></CircularProgress>
            )}
        </Grid>

    );
};

export default SeleccionarPerro;
