import React, { Suspense, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import LoginComponent from '../components/Login';
import Main from '../Pages/Main';
import ProtectedRoutes from './ProtectedRoutes';


const RouterApp = () => {

    const { token } = useContext(AuthContext);


    return (
        <Suspense>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        {/* <Route path="/register" element={<Register />} /> */}
                        {/* <Route path="/forgot_password" element={<ForgotPassword />} /> */}
                        {/* <Route path="*" element={<NotFound />} /> */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoutes isAutenticated={token}>
                                    <Main />
                                </ProtectedRoutes>
                            }
                        />
                    </Routes>
                </Router>
        </Suspense>
    )
}

export default RouterApp

