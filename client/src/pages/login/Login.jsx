import { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    // console.log(inputs);


    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/auth/login", {
                username: inputs.username,
                password: inputs.password
            });
            if (!data && !data?.success) {
                // console.log(data.error);
                message.error(data?.message);

            } else {
                // console.log(data.message);
                message.success(data && data.message);
                setAuth(data.others)
                localStorage.setItem("user", JSON.stringify(data.others))
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            message.error("Invalid email or password")
        }
    }



    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={ handleSubmit }>
                <label>Username</label>
                <input type="text" value={ inputs.username } name='username' onChange={ handleChange } className='loginInput focus:outline-gray-500' placeholder='Username...' autoComplete='off' autoFocus />
                <label>Password</label>
                <div className="pass relative">
                    <input type={ show ? "text" : "password" } value={ inputs.password } name="password" onChange={ handleChange } className='loginInput focus:outline-gray-500' placeholder='Password...' autoComplete='off' />
                    <span className='absolute top-2 right-0 mx-2 cursor-pointer text-gray-600' onClick={ () => setShow(!show) }>{ inputs.password === '' ? "" : show ? "Hide" : "Show" }</span>
                </div>

                <button className="loginBtn">Login</button>
                <button className="loginRegisterBtn">
                    <Link to={ '/register' }>Register</Link>
                </button>
            </form>
        </div>
    )
}

export default Login
