import React, { useEffect } from 'react';
import "./../StudentsList/StudentsList.css";
import SimpleTableComponent from "reactjs-simple-table";

function StudentsListUI(props) {
    return (
        <div className='gridStyle'>
            <SimpleTableComponent columns={props.columns} list={props.data} />
        </div>
    );
}

export default StudentsListUI;
