// Dependencies
import React from "react";
import {getKartkatalogApiUrl} from "@/actions/ApiUrlActions";
import {useEffect, useState} from "react";
import {redirect} from "react-router";
import {getUser, login} from "@/reducers/UserReducer";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

const User = () => {
    const { profile, isAuthenticated } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        return <p>Bruker er ikke autentisert, logg inn <Link to={"/login"}>her</Link>.</p>;
    }

    return profile && (
        <p>
            User: {profile.Name}
        </p>
    );
};

export default User;