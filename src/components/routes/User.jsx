// Dependencies
import React from "react";
import {getKartkatalogApiUrl} from "@/actions/ApiUrlActions";
import {useEffect, useState} from "react";
import {redirect} from "react-router";

const User = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let url = getKartkatalogApiUrl()() + "/user";

        fetch(url)
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
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <p>
            User: {user.Name}
        </p>
    );
};

export default User;