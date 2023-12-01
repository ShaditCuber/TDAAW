import React, { useState } from 'react';
import { Button, Box, Typography, Modal, Card, CardMedia, CardActions } from "@mui/material";
import { obtenerPerro, obtenerPerroAleatorio, actualizarUsuario } from '../queries/services/services';

export default function SeleccionarPerroModal({ abierto, cerrarModal, perroActual, setPerroUsuario, actualizarUsuario }) {
    const [perroSeleccionado, setPerroSeleccionado] = useState(perroActual);

    // Función para obtener un perro aleatorio
    const cambiarPerro = async () => {
        const perroAleatorio = await obtenerPerroAleatorio();
        const perro = await obtenerPerro(perroAleatorio.perro.id)
        setPerroSeleccionado(perro);
    };

    // Función para aceptar el perro actual
    const aceptarPerro = async () => {
        if (perroSeleccionado) {
            await actualizarUsuario(perroSeleccionado.perro.id); // Actualiza el perro del usuario
            setPerroUsuario(perroSeleccionado); // Actualiza el perro del usuario en el estado global
            cerrarModal();
            window.location.reload();
        }
    };

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
                <Typography variant="h6" align="center" sx={{ marginBottom: '20px', color : 'black'}}>
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
                            image={perroSeleccionado.perro.url_foto}
                            alt={`Imagen de ${perroSeleccionado.perro.nombre}`}
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ padding: '10px' }}>
                            {perroSeleccionado.perro.nombre}
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
                )}
            </Box>
        </Modal>
    );
}
