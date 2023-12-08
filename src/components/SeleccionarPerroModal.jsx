import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Modal, Card, CardMedia, CardActions } from "@mui/material";
import { obtenerPerro, obtenerPerroAleatorio, actualizarUsuario } from '@queries/queries';

export default function SeleccionarPerroModal({ abierto, cerrarModal, perroActual, setPerroUsuario, actualizarUsuario }) {
    
    const [perroSeleccionado, setPerroSeleccionado] = useState(perroActual);

    const cargarPerroAleatorio = async () => {
        setPerroSeleccionado(null);
        const perroAleatorio = await obtenerPerroAleatorio();
        const perro = await obtenerPerro(perroAleatorio.perro.id)
        const url_foto = perro.perro.url_foto;
        const img = new Image();
        img.src = url_foto;
        img.onload = () => {
            setPerroSeleccionado(perro.perro);
        }
        img.onerror = () => {
            cargarPerroAleatorio();
        }
    };
    const aceptarPerro = async () => {
        if (perroSeleccionado) {
            await actualizarUsuario(perroSeleccionado.perro.id); // Actualiza el perro del usuario
            setPerroUsuario(perroSeleccionado); // Actualiza el perro del usuario en el estado global
            cerrarModal();
            window.location.reload();
        }
    };
    

    useEffect(() => {
        cargarPerroAleatorio();
    }, []);

    return (
        <Modal
            open={abierto}
            onClose={cerrarModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
                <Typography variant="h6" align="center" sx={{ marginBottom: '20px', color: 'black' }}>
                    Registra a tu Perro Favorito para comenzar a buscarle pareja
                </Typography>
                {perroSeleccionado && (
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{
                                width: '100%', // Asegura que la imagen ocupe todo el ancho del card
                                objectFit: 'cover',
                                maxHeight: '600px' // Asegura que la imagen no se salga del card
                            }}
                            image={perroSeleccionado.url_foto}
                            alt={`Imagen de ${perroSeleccionado.nombre}`}
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ padding: '10px' }}>
                            {perroSeleccionado.nombre}
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
                )}
            </Box>
        </Modal>
    );
}
