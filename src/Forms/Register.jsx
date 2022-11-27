import "../styles/login.css"
import { Link } from "react-router-dom";
import Logo from "../images/Wikemon.png"

function Register() {
    return (
      <div className="todo">
      <form className="login">
        <div className="center">
        <div className="logo">
            <img src={Logo}  />
        </div>
          <label className="label-welcome">
            Registrate
          </label>
        </div>
      <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
     <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-dark w-100">Submit</button>
  <br />
</form>

      </div>
    );
  }

export default Register;