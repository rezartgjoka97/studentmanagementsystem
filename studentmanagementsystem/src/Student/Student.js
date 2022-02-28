import React, { useEffect, useState } from 'react';
import StudentUI from './StudentUI';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Student() {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [list, setList] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState(null);
    const [changedInputs, setChangedInputs] = useState(null);

    const isUserAuth = localStorage.getItem('isAuth');

    console.log(isUserAuth);

    const columns = [
        {
            field: "subject",
            headerName: "Lënda",
        },
        {
            field: "subscribe",
            headerName: "Subscribe",
        },
        {
            field: "subscribeDate",
            headerName: "Data",
        },
        {
            field: "otherInfo",
            headerName: "Info të tjera",
        },
    ];

    const { state } = useLocation();

    useEffect(() => {
        if (state && state.id) {
            fetchData(state.id);
        }
        getCoursesList();
    }, []);

    const getCoursesList = () => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(`https://localhost:44370/api/courses`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.table(data);
                setCoursesList(data);
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    const setCoursesList = (coursesData) => {
        if (coursesData && coursesData.length > 0) {
            const coursesList = [];
            coursesData.map(course => {
                const option = {
                    id: course.id,
                    subject: course.name,
                    subscribe: <input
                        type="checkbox"
                        name="topping" className='checkboxstyle'
                        onClick={(e) => { handleCheckBoxClick(e.target.checked, course.id) }} />,
                    subscribeDate: '',
                    otherInfo: <input type="text" onChange={(e) => { handleInputChange(e.target.value, course.id) }} />
                };
                coursesList.push(option);
            });
            getSubscribedCoursesData(coursesList);
        }
    }

    const getSubscribedCoursesData = (courseData) => {
        if (state && state.id) {
            const requestOptions = {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
            };

            fetch(`https://localhost:44370/api/SubscribedCourses/list/${state.id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setSubscribedCoursesData(data, courseData);
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }

    const setSubscribedCoursesData = (data, courseData) => {
        if (data.result && data.result.length > 0) {
            courseData.map((course, index) => {
                const objFound = data.result.find((el) => el.courseId === course.id);
                if (objFound) {
                    courseData[index] = {
                        id: course.id,
                        subject: course.subject,
                        subscribe: <input
                            type="checkbox"
                            className='checkboxstyle'
                            name="topping"
                            onClick={(e) => { handleCheckBoxClick(e.target.checked, course.id) }}
                            checked={objFound.subscribed} />,
                        subscribeDate: objFound.subscribeDate.split('T')[0],
                        otherInfo: <input type="text" onChange={(e) => { handleInputChange(e.target.value, course.id) }} defaultValue={objFound.otherInfo} />
                    }
                }
            });
        }


        setList(courseData);
    }
    let changedInputList = [];

    const handleInputChange = (e, id) => {
        let selectedArray = changedInputList;
        if (selectedArray.find(x => x && x.courseId === id)) {
            selectedArray = selectedArray.filter(x => x.courseId !== id);
        }
        selectedArray.push({
            courseId: id,
            otherInfo: e
        });
        changedInputList = selectedArray;
        setChangedInputs(changedInputList);
    }

    let selectedCoursesList = [];
    const handleCheckBoxClick = (checked, id) => {
        let selectedArray = selectedCoursesList;
        if (selectedArray.find(x => x && x.courseId === id)) {
            selectedArray = selectedArray.filter(x => x.courseId !== id);
        }
        selectedArray.push({
            courseId: id,
            subscribed: checked
        });
        selectedCoursesList = selectedArray;
        setSelectedCourses(selectedCoursesList);
    }

    const fetchData = (id) => {
        // POST request using fetch inside useEffect React hook
        const studentRequestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(`https://localhost:44370/api/students/${id}`, studentRequestOptions)
            .then(response => response.json())
            .then(data => {
                setInitialData(data);
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    const setInitialData = (dataVal) => {
        const values = {
            idstudent: dataVal.nid,
            namestudent: dataVal.name,
            grade: dataVal.grade,
            profession: dataVal.profession,
            educationInfo: dataVal.education,
            password: dataVal.password,
            surName: dataVal.surName
        }
        setData(values);
    }

    const onUpdate = (event) => {
        event.preventDefault();
        console.log(selectedCourses);
        const { idstudent, namestudent, grade, profession, educationInfo, password, surname } = document.forms[0];;
        const studentBody = {
            id: state.id,
            nid: idstudent.value,
            name: namestudent.value,
            grade: parseFloat(grade.value),
            profession: profession.value,
            education: educationInfo.value,
            password: password.value,
            surName: surname.value
        };
        let inputsList = changedInputs;
        const subscribedCoursesList = [];
        const d = new Date();
        const dataString = d.toISOString();
        if (selectedCourses && selectedCourses.length > 0) {
            selectedCourses.map((elem => {
                let obj = null;
                if (inputsList && inputsList.length > 0) {
                    obj = inputsList.find(x => x.courseId === elem.courseId);
                }
                const subCoursesBody = {
                    studentId: state.id,
                    courseId: elem.courseId,
                    subscribed: elem.subscribed,
                    otherInfo: obj ? obj.otherInfo : '',
                    subscribeDate: dataString
                };
                if (obj) {
                    inputsList = inputsList.filter((el) => el.courseId !== elem.courseId);
                }
                subscribedCoursesList.push(subCoursesBody);
            }));
            if (inputsList && inputsList.length > 0) {
                inputsList.map((elem) => {
                    const subCoursesBody = {
                        studentId: state.id,
                        courseId: elem.courseId,
                        subscribed: true,
                        otherInfo: elem.otherInfo,
                        subscribeDate: dataString
                    };
                    subscribedCoursesList.push(subCoursesBody);
                });
            }
        } else if (changedInputs && changedInputs.length > 0) {
            changedInputs.map((elem) => {
                const subCoursesBody = {
                    studentId: state.id,
                    courseId: elem.courseId,
                    subscribed: true,
                    otherInfo: elem.otherInfo,
                    subscribeDate: dataString
                };
                subscribedCoursesList.push(subCoursesBody);
            });
        }


        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentBody)
        };

        fetch(`https://localhost:44370/api/students/${state.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
            })
            .catch(function (err) {

            });

        const subscribeRequestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscribedCoursesList)
        };

        fetch(`https://localhost:44370/api/SubscribedCourses/updatesubcourses/${state.id}`, subscribeRequestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/students");
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    if (!isUserAuth || isUserAuth === "false")
        return null;

    return (
        <StudentUI
            columns={columns}
            list={list}
            data={data}
            onUpdate={onUpdate}
        />
    );
}

export default Student;
