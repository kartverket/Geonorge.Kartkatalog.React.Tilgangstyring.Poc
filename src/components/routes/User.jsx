// Dependencies
import React from "react";
import {getKartkatalogApiUrl} from "@/actions/ApiUrlActions";
import {useEffect, useState} from "react";
import {redirect} from "react-router";
import {login} from "@/reducers/UserReducer";
import {useDispatch} from "react-redux";

const User = () => {
    const dispatch = useDispatch();
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
                    dispatch(login(user));
                }
            });
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

export default User;