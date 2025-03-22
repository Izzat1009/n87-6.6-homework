import { createBrowserRouter } from "react-router-dom";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";




export const route = createBrowserRouter([
    {
        path:"/",
        element:<Register/>
    }
    ,
    {
        path:"/login",
        element:<Login/>
    }
])