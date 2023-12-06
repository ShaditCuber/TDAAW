import { Box } from "@mui/material";
import {deleteToken } from "../util/usuario";
import { useLocation } from "react-router-dom";



export default function ErrorPage() {
    // saber que error es
    // deleteToken();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <h1>Oops!</h1>
            <p>Tu no has visto nada!</p>
            {/* Asegúrate de reemplazar 'path_to_your_gif.gif' con la ruta correcta */}
            <img src="https://media.tenor.com/K_oHvIkUao8AAAAC/no-has-visto-nada-ping%C3%BCino-madagascar.gif" alt="Error GIF" />
        </Box>
    );
}
