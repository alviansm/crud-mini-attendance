import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../index.css";
import People from "./People";

function Add() {
    let currentTime = Date().toLocaleString();
    
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [job, setJob] = useState("");
    const [peopleData, setPeopleData] = useState([]);
    let attend_time = "08:00";
    
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ':' + seconds;
        return strTime;
    };

    attend_time = formatAMPM(new Date());
    
    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
            setPeopleData(response.data);
        });
    }, []);

    // function randomNumber(digit) {
    //     let number = Math.floor(Math.random() * digit);
    
    //     return number;
    // };

    const submitPerson = () => {        
        Axios.post("http://localhost:3001/api/insert", {
            // id: id,
            fullname: fullName, 
            email: email, 
            age: age, 
            job: job, 
            attend_time: attend_time
        });

        setPeopleData([
            ...peopleData,
            {
                // id: id,
                fullname: fullName, 
                email: email, 
                age: age, 
                job: job, 
                attend_time: attend_time
            }
        ]);
    };

    return (
        <div className="twleve column">
            <div>
                <div className="row">
                        <div className="six columns">
                            <label htmlFor="exampleNameInput">Nama</label>
                            <input className="u-full-width" type="text" placeholder="Nama Lengkap" id="exampleNameInput" onChange={(e) => setFullName(e.target.value)}></input>
                        </div>
                        <div className="six columns">
                            <label htmlFor="exampleAgeInput">Usia</label>
                            <input className="u-full-width" type="number" placeholder="18" id="exampleAgeInput" min="1" max="3000" onChange={(e) => setAge(e.target.value)}></input>
                        </div>
                </div>
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="exampleEmailInput">Email</label>
                        <input className="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="six columns">
                    <label htmlFor="exampleRecipientInput">Profesi</label>
                    <select className="u-full-width" id="exampleRecipientInput" onChange={(e) => setJob(e.target.value)}>
                        <option value="Teknisi">Teknisi</option>
                        <option value="ASN">ASN</option>
                        <option value="Pelajar">Pelajar</option>
                        <option value="Akademisi">Akademisi</option>
                        <option value="Pengacara">Pengacara</option>
                        <option value="Pengangguran">Pengangguran</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                    </div>
                </div>
                <input className="button-primary" type="submit" value="Submit" onClick={submitPerson}></input>
                <p>{currentTime}</p>
            </div>
            <People value={peopleData}></People>
        </div>
    );
};

export default Add;