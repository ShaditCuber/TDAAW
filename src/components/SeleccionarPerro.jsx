import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Box, CardActions } from "@mui/material";
import { actualizarUsuario, obtenerPerro, useObtenerPerroAleatorio } from "../queries/queries";

const SeleccionarPerro = ({ onPerroSeleccionado }) => {
    const [perro, setPerro] = useState(null);

    const cargarPerroAleatorio = async () => {
        console.log('Perro aleatorio')
        const perroAleatorio =  useObtenerPerroAleatorio();
        console.log(perroAleatorio)
        const perro = await obtenerPerro(perroAleatorio.perro.id)
        setPerro(perro.perro);
    };

    const aceptarPerro = async () => {
        if (perro) {
            await actualizarUsuario(perro.id); // Actualiza el perro del usuario
            window.location = "/";
        }
    };

    const cambiarPerro = async () => {
        const perroAleatorio = useObtenerPerroAleatorio();
        const perro = await obtenerPerro(perroAleatorio.perro.id)
        setPerro(perro.perro);
    }
    console.log('Perro aleatorio')

    useEffect(() =>  {
        let montado = true;
        console.log('Perro aleatorio')
        cargarPerroAleatorio();

        return () => {
            montado = false;
        };
    }, []);


    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            {perro && (
                <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
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
                            <Button size="small" color="secondary" onClick={cambiarPerro}>
                                Ver Otro Perro
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            )}
        </Grid>
    );
};

export default SeleccionarPerro;
