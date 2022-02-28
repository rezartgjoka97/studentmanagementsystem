import React, { useEffect } from 'react';
import RegistrationUI from './RegistrationUI';
import "./../Registration/Registration.css";
import { useNavigate } from "react-router-dom";


function Registration(props) {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        var { idstudent, pass, namestudent, surnamestudent } = document.forms[0];
        var studentId = idstudent.value;
        var password = pass.value;
        var studentName = namestudent.value;
        var studentLastName = surnamestudent.value;
        var body = {
            NID: studentId,
            name: studentName,
            surName: studentLastName,
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

        fetch('https://localhost:44370/api/students', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data) {
                    localStorage.setItem('isAuth', true);
                    navigate("/students");
                }
            });
    };

    const onCancel = () => {
        navigate("/");
    }

    return (
        <RegistrationUI handleSubmit={handleSubmit} onCancel={onCancel} />
    );
}

export default Registration;
