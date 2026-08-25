// Dependencies
import React from "react";
import {getKartkatalogApiUrl} from "@/actions/ApiUrlActions";
import {useEffect, useState} from "react";
import {redirect} from "react-router";

const User = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let url = getKartkatalogApiUrl()() + "/user";

        const token = getCookieValue("BearerToken")

        if(token)
        {
            fetch(url, {headers: {'Authorization': `Bearer ${token}`}})
                .then(response => {
                    if (response.status === 403) {
                        redirect("/login")
                    }
                    return response.json();
                })
                .then(user => {
                    if (user) {
                        setUser(user);
                    }
                });
        }
    }, []);

    if (!user) {
        return <p>Laster...</p>;
    }

    return (
        <p>
            User: {user.Name}
        </p>
    );
};

function getCookieValue(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return decodeURIComponent(match[2]);
    }
    return null;
}

export default User;