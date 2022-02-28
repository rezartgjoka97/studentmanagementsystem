import NavBarUI from './NavBarUI';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Identification from '../Identification/Identification';
import Registration from '../Registration/Registration';
import StudentsList from '../StudentsList/StudentsList';
import Student from '../Student/Student';

function NavBar() {
    return (
        <div >
            <Router>
                <NavBarUI />
                <Routes >
                    <Route path="/" element={<Identification />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/students" element={<StudentsList />} />
                    <Route path="/studentsDetail" element={<Student />} />
                </Routes >
            </Router>
        </div>
    );
}

export default NavBar;
