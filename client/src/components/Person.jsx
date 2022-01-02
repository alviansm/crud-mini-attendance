import React, { useState } from "react";
import Axios from 'axios';

function Person(props) { 
    const [mytime, setMyTime] = useState(props.data.attend_time);
    let attend_time = "";

    function deletePerson(personName) {
        Axios.delete(`http://localhost:3001/api/delete/${personName}`)
        .then(alert("Kehadiran " + personName + " telah dihapus. Silahkan refresh untuk memperbarui tabel."));
    };

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ':' + seconds;
        return strTime;
    };

    const updateTime = (fullName) => {
        attend_time = formatAMPM(new Date());
        Axios.put("http://localhost:3001/api/update", {
            fullname: fullName,
            attend_time: attend_time
        });
        setMyTime(attend_time);
        return attend_time;
    };

    return (
        <tbody>
                <tr>
                    <td>{props.data.fullname}</td>
                    <td>{props.data.age}</td>
                    <td>{props.data.job}</td>
                    <td>{mytime}</td>
                    <td>
                        <button className="button-primary" onClick={() => {deletePerson(props.data.fullname)}}>Hapus</button>
                        <button onClick={() => updateTime(props.data.fullname)}>Update</button>
                    </td>
                </tr>
        </tbody>
    );
};

export default Person;