import React from 'react';
import SimpleTableComponent from 'reactjs-simple-table';
import "./../Student/Student.css";
import { useNavigate } from "react-router-dom";

function StudentUI(props) {
    let { idstudent, namestudent, grade, profession, educationInfo, password, surName } = '';
    if (props.data) {
        idstudent = props.data.idstudent;
        namestudent = props.data.namestudent;
        grade = props.data.grade;
        profession = props.data.profession;
        educationInfo = props.data.educationInfo;
        password = props.data.password;
        surName = props.data.surName;
    };
    const navigate = useNavigate();
    return (
        <div className="body">
            <div>
                <form
                    onSubmit={props.onUpdate}
                >
                    <div className="detailsFormDiv">
                        <div className={"inputGroup"}>
                            <div className={"groupStyleDetails"}>
                                <div className="input-container-details">
                                    <input type="text" value="NID student" readOnly={true} />
                                    <input type="text" name="idstudent" required defaultValue={idstudent} />
                                </div>
                                <div className="input-container-details">
                                    <input type="text" value="Fjalekalimi" readOnly={true} />
                                    <input type="password" name="password" defaultValue={password} />
                                </div>
                            </div>
                            <div className={"groupStyleDetails"}>
                                <div className="input-container-details">
                                    <input type="text" value="Emer studenti" readOnly={true} />
                                    <input type="text" name="namestudent" defaultValue={namestudent} />
                                </div>
                                <div className="input-container-details">
                                    <input type="text" value="Mbiemer studenti" readOnly={true} />
                                    <input type="text" name="surname" defaultValue={surName} />
                                </div>

                            </div>
                            <div className={"groupStyleDetails"}>
                                <div className="input-container-details">
                                    <input type="text" value="Nota mesatare" readOnly={true} />
                                    <input type="text" name="grade" defaultValue={grade} />
                                </div>
                                <div className="input-container-details">
                                    <input type="text" value="Professioni i deshiruar" readOnly={true} />
                                    <input type="text" name="profession" defaultValue={profession} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='detailsEducationInfo'>
                        <input
                            type="text"
                            value="Të dhëna të përgjithshme të shkollimit"
                            className='educationInfoTitle'
                            readOnly={true} />
                        <textarea className='textArea' name="educationInfo" defaultValue={educationInfo} />
                    </div>
                    <div className='detailsGrid'>
                        <SimpleTableComponent columns={props.columns} list={props.list} />
                    </div>
                    <div className='modifyButtonGroup'>
                        <input type="submit" style={{ height: '10%', marginTop: '10%' }} value={"Ruaj"} />
                        <input
                            type="button"
                            value={"Anullo"}
                            className='cancelButton'
                            onClick={() => {
                                navigate("/students");
                            }}
                        /></div>
                </form>
            </div>
            <div className={"detailsImage"}></div></div>
    );
}

export default StudentUI;
