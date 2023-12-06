import React from "react";
import {
    Button,
    Card,
    CardActions,
    Container,
    Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CustomTextField from "../Pages/CustomComponents/CustomTextfield";
import { useUsuario } from "../context/AuthContext";

const Login = () => {
    const { handleSubmit, control, } = useForm({
        defaultValues: { email: "", password: "" },
    });

    const { loginUsuario } = useUsuario();

    const onSubmit = (data) => {
        loginUsuario(data);
    };

    const handleRegister = () => {
        window.location = "/register";
    }



    return (
        <Container>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item md={12} xs={12} sx={{ mb: 5 }}>
                    <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
                        <Card sx={{ p: 1 }}>
                            <Grid
                                container
                                spacing={1}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item md={4}>
                                    <CustomTextField
                                        label="Correo"
                                        name="email"
                                        type="email"
                                        control={control}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <CustomTextField
                                        name="password"
                                        label="Contraseña"
                                        type="password"
                                        control={control}
                                    />
                                </Grid>
                            </Grid>
                            <CardActions>
                                <Button
                                    id="iniciar_sesion"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    sx={{ mr: 1 }}  // Agregado un margen a la derecha
                                >
                                    Iniciar Sesión
                                </Button>
                                <Button
                                    id="registrarse"
                                    color="secondary"
                                    size="large"
                                    variant="contained"
                                    sx={{ ml: 1 }}  // Agregado un margen a la izquierda
                                    onClick={handleRegister}  // Función que se activará al hacer clic
                                >
                                    Registrarse
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Login;