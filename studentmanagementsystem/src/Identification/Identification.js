import React, { useEffect } from 'react';
import IdentificationUI from './IdentificationUI';
import { useNavigate } from "react-router-dom";

function Identification() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        var { nid, pass } = document.forms[0];
        var studentId = nid.value;
        var password = pass.value;
        var body = {
            NID: studentId,
            password: password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        fetch('https://localhost:44370/api/Students/login', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data && data.result) {
                    localStorage.setItem('isAuth', true);
                    navigate("/students");
                }
            });
    };
    const handleClick = () => {
        navigate("/register");
    }

    return (
        <IdentificationUI
            handleSubmit={handleSubmit}
            handleClick={handleClick}
        />
    );
}

export default Identification;
