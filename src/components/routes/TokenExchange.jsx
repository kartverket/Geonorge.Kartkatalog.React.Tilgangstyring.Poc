// Dependencies
import React from "react";
import {getKartkatalogApiUrl} from "@/actions/ApiUrlActions";
import {useEffect, useState} from "react";
import {redirect} from "react-router";
import {login} from "@/reducers/UserReducer";
import {useDispatch} from "react-redux";

const TokenExchange = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        let url = getKartkatalogApiUrl()() + "/token-exchange";
        fetch(url)
            .then(response => {
                if (response.status === 403) {
                    redirect("/login")
                }
                setToken(getCookie("oidcAccessToken"))
            })
    }, []);

    if (!token) {
        return <p>Laster...</p>;
    }

    return (
        <p>
            Token: {token}
        </p>
    );
};

export default TokenExchange;