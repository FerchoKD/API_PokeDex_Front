import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from "react"
import Input from "../Forms/Input";
//import Prueba from "../context/Prueba"
//import UserContext from "../context/UserContext"
//import { useDispatch } from 'react-redux';
import PokemonContext from "../context/PokemonContext"

function Form() {

    //const value = useContext(PokemonContext);
    const [user, setUser] = useState(null)
    //const dispatch = useDispatch();
    const form = useRef(null);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [specie, setSpecie] = useState("");
    const [type, setType] = useState("");
    const [pokemon, setPokemon] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        let token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+ token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        var raw = JSON.stringify({
            "name": formData.get('name'),
            "species": formData.get('especie'),
            "type": formData.get('type'),
            "image": "null"
        });
        console.log(token);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch('http://localhost:8080/pokemon', requestOptions)
            .then(res => {
                switch (res.status) {
                    case 200:
                        alert("Éxito")
                        break;
                    case 201:
                        alert("201. Registro exitoso")
                        return res.json()
                        break;
                    case 400:
                        alert("Error 400: Favor de ingresar bien los datos")
                        break;
                    case 401:
                        alert("Error 401: Respuesta no autenticada. No autorizado")
                        break;
                    case 403:
                        alert("Error 403: Lo sentimos, pero no tiene los permisos necesarios")
                        break;
                    case 404:
                        alert("Error 404: No encontrado")
                        break;
                    case 500:
                        alert("Error 500: El nombre de usuario ya existe")
                        return res.json()
                        break;
                }
            })
            .then(data => {
                console.log(data)
                if (data.httpStatus === 'CREATED') {
                    alert("Pokemon Creado Correctamente")
                    dispatch({
                        type: "ACTION01",
                        value: {
                            id: data.data.id,
                            name: data.data.name
                        }
                    })
                    navigate("/Picture")
                } else {
                    alert("Error al crear Pokemon")
                    navigate("/crear")
                }
            })

            .catch(err => console.error(err))
    }

    function context(id, name) {
        if (pokemon) {
            setPokemon(null)
        } else {
            setPokemon({
                id: id,
                name: name
            })
        }
        console.log(pokemon)
    }

    function handleChangeName(e) {
        const value = e.target.value;
        setName(value);
    }

    function handleChangeSpecie(e) {
        const value = e.target.value;
        setSpecie(value);
    }

    function handleChangeType(e) {
        const value = e.target.value;
        setType(value);
    }
    return (
        <PokemonContext.Provider value={{ pokemon, setPokemon }}>
                      <div class="main-w3layouts wrapper">
                      <h1>Crea tus personajes</h1>
                      <div class="main-agileinfo">
                <form onSubmit={handleSubmit} ref={form}>
                    <div className="input-container">
                        <br/>
                        <br/>
                        <Input
                            label="Nombre"
                            type="text"
                            name="name"
                            placeholder="Ejem: 'PokSar'"
                            id="name"
                            classname="input"
                            onChange={handleChangeName}
                        />
                                                <br/>
                                                <br/>
                        <Input
                            label="Especie"
                            type="text"
                            name="especie"
                            id="especie"
                            classname="input"
                            placeholder="Ejem: 'nidoran'"
                            onChange={handleChangeSpecie}
                        />
                                                <br/>
                                                <br/>
                        <Input
                            label="Tipo"
                            type="text"
                            name="type"
                            id="type"
                            classname="input"
                            placeholder="Ejem: 'veneno' "
                            onChange={handleChangeType}
                        />
                    </div>

                    <div className="button-container">
                    <br/>
                    <br/>
                        <Input
                            type="submit"
                            classname="button"
                            value="Login"
                        />
                    </div>
                    {pokemon && JSON.stringify(pokemon)}
                    </form>
            </div>
            </div>
        </PokemonContext.Provider>
    )
}

export default Form;