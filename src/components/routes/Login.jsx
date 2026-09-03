// Dependencies
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if(!isAuthenticated)
            window.location.reload()
        else
            window.location.href = '/'

    }, []);
    return <p>Du skal bli automatisk tatt videre til login</p>
};

export default Login;
