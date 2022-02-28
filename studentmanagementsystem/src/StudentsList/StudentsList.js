import React, { useEffect, useState } from 'react';
import StudentsListUI from './StudentsListUI';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "./../StudentsList/StudentsList.css";
import { useNavigate } from "react-router-dom";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
function StudentsList() {

    const [data, setData] = useState(null);
    const [modal, setModal] = useState(false);
    const [stdId, setstdId] = useState(null);

    const isUserAuth = localStorage.getItem('isAuth');

    const columns = [
        {
            field: "studentId",
            headerName: "NID studenti",
        },
        {
            field: "studentName",
            headerName: "Emer studenti",
        },
        {
            field: "studentSurName",
            headerName: "Mbiemer studenti",
        },
        {
            field: "subscribedSubjectsNumber",
            headerName: "Numri i lendeve te bera subsribe",
        },
        {
            field: "modify",
            headerName: "Modifiko",
        },
        {
            field: "delete",
            headerName: "Fshi",
        },
    ];
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
    }, []);


    const fetchNumberOfSubs = (list) => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://localhost:44370/api/SubscribedCourses/getnumberofsubs', requestOptions)
            .then(response => response.json())
            .then(data => {
                prepareNumberOfSubs(data, list);
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    const prepareNumberOfSubs = (dataList, list) => {
        let listt = list;
        if (dataList && dataList.length > 0) {
            listt.map((val, index) => {
                const obj = dataList.find((el) => el.stdId === val.id);
                if (obj && obj.subsNumber) {
                    listt[index].subscribedSubjectsNumber = obj.subsNumber;
                }
            });
        }
        setData(listt);
    }

    const fetchData = () => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://localhost:44370/api/students', requestOptions)
            .then(response => response.json())
            .then(data => {
                prepareData(data);
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    const prepareData = (data) => {
        const dataList = [];
        if (data && data.length > 0) {
            data.map(element => {
                const gridRow = {
                    id: element.id,
                    studentId: element.nid,
                    studentName: element.name,
                    studentSurName: element.surName,
                    subscribedSubjectsNumber: 0,
                    modify: <FaEdit size={20} className='modifyBTNStyle' onClick={() => openDetails(element.id)} />,
                    delete: <FaTrash size={20} className='deleteBTNStyle' onClick={() => deleteRow(element.id)} />
                };
                dataList.push(gridRow);
            });
        }
        // setData(dataList);
        fetchNumberOfSubs(dataList);

    }

    const deleteRow = (id) => {
        setstdId(id);
        setModal(true);
    }

    const confirmDeleteRow = () => {
        setModal(false);
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(`https://localhost:44370/api/students/${stdId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.result) {
                    fetchData();
                }
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    const openDetails = (id) => {
        navigate("/studentsDetail", { state: { id: id } });
    }

    if (!isUserAuth || isUserAuth === "false")
        return null;

    return (
        <div>
            <PureModal
                header="Kujdes!"
                footer={
                    <div>
                        <button onClick={() => {
                            setModal(false);
                            setstdId(null);
                        }}>Jo</button>
                        <button onClick={confirmDeleteRow}>Po</button>
                    </div>
                }
                isOpen={modal}
                closeButton="close"
                closeButtonPosition="bottom"
                onClose={() => {
                    setModal(false);
                    return true;
                }}
            >
                <p>Jeni I sigurt qe doni te fshini rekordin?!</p>
            </PureModal>;
            <StudentsListUI
                data={data}
                columns={columns}
            /></div>
    );
}

export default StudentsList;
