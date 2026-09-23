import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import ToDosPage from './routes/ToDosPage';
import RootLayout from './routes/RootLayout';
import Login from './components/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import {AuthProvider} from './components/AuthContext';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: '/',
                        element: <ToDosPage/>
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/login" replace/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);