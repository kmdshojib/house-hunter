import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    }
])