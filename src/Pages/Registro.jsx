// Registro.js
import React from "react";
import { useForm } from "react-hook-form";
import { Container, Grid, Card, Button, CardActions } from "@mui/material";
import CustomTextField from "./CustomComponents/CustomTextfield"; // Asegúrate de que la ruta sea correcta
import { useRegistro } from "../queries/AuthQueries/queryLogin";
import { toast } from 'sonner';



const Registro = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {name : "" , email: "", password: "", confirmPassword: "" },
    });

    async function register(form) {
        const data = await useRegistro(form)
        toast.success(data['message']);
        if (data['message'] === "Usuario registrado!" ) {
            window.location = "/login";
        }
    }

    const onSubmit = (data) => {
        console.log("Datos de registro", data);

        // que las contraseñas coincidan
        if (data.password !== data.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        register(data);

    };

    return (
        <Container>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }} // Centra el formulario verticalmente
            >
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <CustomTextField
                                label="Nombre"
                                name="name"
                                type="text"
                                control={control}
                            />
                            <CustomTextField
                                label="Correo Electrónico"
                                name="email"
                                type="email"
                                control={control}
                            />
                            <CustomTextField
                                label="Contraseña"
                                name="password"
                                type="password"
                                control={control}
                            />
                            <CustomTextField
                                label="Repetir Contraseña"
                                name="confirmPassword"
                                type="password"
                                control={control}
                            />
                            <CardActions>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    fullWidth
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

export default Registro;
