import { Route, Routes } from "react-router-dom";
import Main from "./src/Pages/Main";
import ErrorPage from "./src/Pages/ErrorPage";
import Login from "./src/Pages/Login";
import Registro from "./src/Pages/Registro";
import { useUsuario } from "./src/context/AuthContext";
// import RandomPoke from "./src/Pages/RandomPoke";
import SeleccionarPerro from "./src/components/SeleccionarPerro";

const RouterApp = () => {
    const { usuario } = useUsuario();
    return usuario ? <LogedInRoutes /> : <NotLogedRoutes />;
};

const NotLogedRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/register" element={<Registro />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </>
    );
};

const LogedInRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="/seleccionar" element={<SeleccionarPerro />} />

                {/* <Route path="pokedex" element={<RandomPoke />} /> */}
                {/* <Route path="pokeDetalle/:pokeId" element={<PokeDetalle />} /> */}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </>
    );
};
export default RouterApp;