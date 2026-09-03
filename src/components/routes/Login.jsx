// Dependencies
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getKartkatalogApiUrl} from "@/actions/ApiUrlActions";
import {redirect} from "react-router";

const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if(!isAuthenticated)
            window.location.reload()
        else {
            let url = getKartkatalogApiUrl()() + "/token-exchange";

            fetch(url)
                .then(_ => {
                    window.location.href = '/'
                })
        }
    }, []);
    return <p>Du skal bli automatisk tatt videre til login</p>
};

export default Login;
