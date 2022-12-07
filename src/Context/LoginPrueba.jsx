import "../styles/login.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import UserContext from "./UserContext";

function LoginPrueba() {
    
    const[name, setName] = useState("")
    const[password, setPassword] = useState("")
    const{user, setUser} = useContext(UserContext)
    const form = useRef(null)

    const navigate = useNavigate();

    function handleChangeName(e){
        const value = e.target.value
        setName(value)
    }

    function handleChangePassword(e){
        const value = e.target.value
        setPassword(value)
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(form.current)
        const name = formData.get('name')
        console.log(name)
        Logged(name)
    }

    function Logged(name){
        setUser({
            "id":1,
            "name":name,
            "isLogged": true
        })
        navigate("/prueba")
    }

    return ( 
        <>
            <form ref={form} onSubmit={handleSubmit}>
                <label>Ingresa tu nombre: </label>
                <input type="text" placeholder="Ingresa tu nombre" id="name" name="name" onChange={handleChangeName}/>
                <label>Ingresa tu contraseña: </label>
                <input type="password" name="password" id="password" onChange={handleChangePassword}/>
                <input type="submit" placeholder="Enviar"/>
            </form>
        </>
     );
}

export default LoginPrueba;