import React, {useEffect} from 'react';

import {Navigate, useLocation, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import qs from "query-string";
import {fetchCurrentAuth} from "actions/authAction";

const AuthCallback = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const queryString = qs.parse(location.search)

    useEffect(function () {
        if (queryString.token && queryString.token !== "") {
            localStorage.setItem("token", queryString.token)
            fetchCurrentAuth(dispatch)
        }
    }, [queryString])

    return <Navigate to="/" />
};

export default AuthCallback;