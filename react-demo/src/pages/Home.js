import{Link} from "react-router-dom";
import {useState} from "react";


export default function Home(props){
    const {userData, setUserData} = useState("");
    const [userDatas, setUserDatas] = useState([]);

    const getData = async() =>{
         return fetch("http://localhost:8080/list")
            .then(res=>res.json())

             .then(data => {
                 const response = data

                            setUserDatas(response)});
    }

    const createData = async() => {
        return fetch("http://localhost:8080/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: document.querySelector("#name").value,
                password: document.querySelector("#password").value
            })
        }).then(res=>res.json())
            .then(data => {
                const response = data
                console.log(response)
                setUserDatas(response)

            })
    }

    return (
        <div>
            <h1>Home</h1>
            <input type="button" value="Read Data" onClick={getData}/>
            <input type="button" value="Create Data" onClick={createData}/><br/>
            name: <input id="name" type="text" placeholder="Name"/><br/>
            password: <input id="password" type="password" placeholder="Password"/><br/>

            <div id="DataList">
                <ul>{userDatas.map((item) => (
                    <li>{item.id} : {item.name}</li>
                ))}</ul>
            </div>
        </div>
    )
}