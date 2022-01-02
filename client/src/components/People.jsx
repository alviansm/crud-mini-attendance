import React, { useEffect, useState } from "react";
import Person from "./Person";
import "../index.css";

function People(props) {
    const [peopleList, setPeopleList] = useState([]);

    useEffect(() => {
        setPeopleList(props.value);
        // console.log("data: ", peopleList);
    });

    // useEffect(() => {
    //     Axios.get("http://localhost:3001/api/get")
    //     .then((response) => {
    //         setPeopleList(response.data);
    //     });
    // });

    // function getPeopleList() {
    //     Axios.get("http://localhost:3001/api/get")
    //     .then((=> {
    //         setPeopleList(response.data);
    //     });
    // };

    return (
        <div className="twelve column">            
            <table className="u-full-width">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Usia</th>
                        <th>Pekerjaan</th>
                        <th>Kedatangan</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                {peopleList.map((person) => {
                    return (
                        <Person key={person.id} data={person}></Person>                        
                    );
                })}
            </table>
        </div>
    );
};

export default People;