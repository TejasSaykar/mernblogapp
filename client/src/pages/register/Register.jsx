import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { message } from 'antd'

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    });
    // console.log(inputs)
    const [err, setErr] = useState(false);

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(false)
        try {
            const { data } = await axios.post("/api/v1/auth/register", {
                username: inputs.username,
                email: inputs.email,
                password: inputs.password
            })
            if (data && data?.success) {
                // console.warn(data.message);
                message.success(data && data?.message)
                navigate("/login")
            } else {
                message.error(data?.message)
            }
        } catch (error) {
            console.log(error);
            setErr(true);
            setTimeout(() => {
                setErr(false)
            }, 4000);
        }
    }

    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={ handleSubmit }>
                <label>Username</label>
                <input type="text" name='username' value={ inputs.username } onChange={ handleChange } className='registerInput focus:outline-gray-500' placeholder='Username...' autoComplete='off' autoFocus />
                <label>Email</label>
                <input type="email" name='email' value={ inputs.email } onChange={ handleChange } className='registerInput focus:outline-gray-500' placeholder='Email...' autoComplete='off' />
                <label>Password</label>
                <div className="pass flex relative">
                    <input type={ show ? "text" : "password" } name='password' value={ inputs.password } onChange={ handleChange } className='registerInput focus:outline-gray-500 w-full' placeholder='Password...' autoComplete='off' />
                    <span className='absolute right-0 mx-2 top-2 cursor-pointer text-gray-600' onClick={ () => setShow(!show) }>{ inputs.password === "" ? "" : show ? "Hide" : "Show" }</span>
                </div>

                <button className="registerBtn">Register</button>
                { err && <span className='text-center my-2 h-5 text-red-500 font-semibold'>Something went wrong !</span> }
                <button className="registerLoginBtn">
                    <Link to={ '/login' }>Login</Link>
                </button>
            </form>
        </div>
    )
}

export default Register
