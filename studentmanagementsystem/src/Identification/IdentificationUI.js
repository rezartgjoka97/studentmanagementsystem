import React, { useEffect } from 'react';
import pic from "./../Images/IdentificationImage.webp";
import "./../Identification/Identification.css";

function IdentificationUI(props) {
    return (<div className="body">
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className="formDiv">
                    <label className={"labelDesc"}>Plotesoni te dhenat e meposhtme per t’u
                        identifikuar ne sistemin e menaxhimit te studenteve:</label>
                    <div className="input-container">
                        <label>NID student </label>
                        <input type="text" name="nid" required />
                        {/* {renderErrorMessage("uname")} */}
                    </div>
                    <div className="input-container">
                        <label>Fjalekalimi </label>
                        <input type="password" name="pass" required />
                        {/* {renderErrorMessage("pass")} */}
                    </div>
                    <div className="button-container">
                        <input type="submit" value={"Identifikohu"} />
                        <input type="button" onClick={props.handleClick} value={"Regjistrohu"} />
                    </div>
                </div>
            </form>
        </div>
        <div className={"image"}><img src={pic} /></div></div>
    );
}

export default IdentificationUI;
