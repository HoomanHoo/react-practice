import {useState} from "react";


export default function Home(props){
    // useState 함수는 데이터를 담을 수 있는 변수와 setter를 리턴하며 매개변수로 설정하고자 하는 초기값을 받는다
    const {userData, setUserData} = useState("");
    const [userDatas, setUserDatas] = useState([]);

    // 데이터 Read
    const getData = async() =>{
         return fetch("http://localhost:8080/list")
            .then(res=>res.json())
             .then(data => {
                 const response = data
                 setUserDatas(response)});
    }

    // 데이터 insert
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
                setUserDatas(data)
            })
            .catch(err => console.log(err));
    }

    // 데이터 update
    const updateData = async() => {
        return fetch("http://localhost:8080/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: document.querySelector("#id").value,
                name: document.querySelector("#name").value
            })
        }).then(res=>res.json())
            .then(data => {
                setUserDatas(data)
            })
            .catch(err => console.log(err));
    }

    // 데이터 delete
    const deleteData = async() => {
        return fetch("http://localhost:8080/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: parseInt(document.querySelector("#id").value)
            })
        }).then(res=>res.json())
            .then(data => {
                setUserDatas(data)
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Home</h1>
            <input type="button" value="Read Data" onClick={getData}/>
            <input type="button" value="Create Data" onClick={createData}/>
            <input type="button" value="Update Data" onClick={updateData}/>
            <input type="button" value="Delete Data" onClick={deleteData}/><br/>
            id: <input id="id" type="text" placeholder="id"/><br/><br/>
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