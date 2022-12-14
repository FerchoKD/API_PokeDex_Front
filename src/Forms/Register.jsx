import "../styles/login.css"
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Wikemon.png"
import { useRef, useState } from "react";
import { StatusCode } from "react-http-status-code";

function Register() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const form = useRef(null)
  const navigate = useNavigate()

  function handleChangeName(e) {
    const value = e.target.value
    setName(value)
  }

  function handleChangePassword(e) {
    const value = e.target.value
    setPassword(value)
  }

  function handleChangeEmail(e) {
    const value = e.target.value
    setEmail(value)
  }

  function handleChangeUserName(e) {
    const value = e.target.value
    setUsername(value)
  }

  function handleChangeSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form.current)
    const name = formData.get('name')
    const password = formData.get('password')
    const email = formData.get('email')
    const UserName = formData.get('username')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "nombre": name,
      "nombreUsuario": UserName,
      "email": email,
      "password": password,
      "roles": ["USER"]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/auth/nuevo", requestOptions)
      .then(response => {
        console.log(response)
        switch (response.status) {
          case 200:
            alert("Éxito")
            break;
          case 201:
            alert("201. Registro exitoso")
            return response.json()
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
              return response.json()
              break; 
        }
      })
      
      .then(data => {
        console.log(data)
        if(data.httpStatus === 'CREATED'){
          alert("Usuario Creado Correctamente")
          navigate("/")
        }else{
          alert("Error al registrarse")
          navigate("/Register")
        }
      })
      .catch(error => console.log('error', error));
    }

  return (
    <div className="todo_log">
      <form className="login" onSubmit={handleChangeSubmit} ref={form}>
        <div className="center">
          <div className="logo">
            <img src={Logo} />
          </div>
          <h1 className="label-welcome">
            Registrate
          </h1>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Nombre: </label>
          <input type="text" className="form-control" id="name" name="name" onChange={handleChangeName} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Nombre de Usuario:</label>
          <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" onChange={handleChangeUserName} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Email: </label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleChangeEmail} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleChangePassword} />
        </div>
        <button type="submit" className="btn btn-dark w-100">Submit</button>
        <Link to="/" className="redirect" >Ya tienes una cuenta? </Link>
        <br />
      </form>

    </div>
  );
}

export default Register;