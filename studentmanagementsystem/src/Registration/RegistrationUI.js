import React, { useEffect } from 'react';
import "./../Registration/Registration.css";

function RegistrationUI(props) {
    return (<div className="body">
        <div>
            <form
                onSubmit={props.handleSubmit}
            >
                <div className="registrationFormDiv">
                    <label className={"registrationLabelDesc"}>
                        Plotesoni te dhenat e meposhtme per t’u
                        rregjistruar ne sistemin e menaxhimit te studenteve:</label>
                    <div className={"inputGroup"}>
                        <div className={"firstGroupStyle"}>
                            <div className="input-container">
                                <label>NID student </label>
                                <input type="text" name="idstudent" required />
                                {/* {renderErrorMessage("uname")} */}
                            </div>
                            <div className="input-container">
                                <label>Fjalekalimi </label>
                                <input type="password" name="pass" required />
                                {/* {renderErrorMessage("pass")} */}
                            </div>
                        </div>
                        <div className={"secondGroupStyle"}>
                            <div className="input-container">
                                <label>Emer studenti </label>
                                <input type="text" name="namestudent" />
                                {/* {renderErrorMessage("uname")} */}
                            </div>
                            <div className="input-container">
                                <label>Mbiemer studenti </label>
                                <input type="text" name="surnamestudent" />
                                {/* {renderErrorMessage("uname")} */}
                            </div>
                        </div>
                    </div>
                    <div className="registrationButtonContainer">
                        <input type="submit" value={"Regjistrohu"} />
                        <input type="button" value={"Anullo"} onClick={props.onCancel} />
                    </div>
                </div>
            </form>
        </div>
        <div className={"registrationImage"}></div></div>
    );
}

export default RegistrationUI;

