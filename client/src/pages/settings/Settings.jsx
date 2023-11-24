import './settings.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'

const Settings = () => {

    const [show, setShow] = useState(false);
    const [auth, setAuth] = useAuth();

    const [username, setUsername] = useState(auth.username);
    const [email, setEmail] = useState(auth.email);
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const PF = "http://localhost:8800/images/"

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateUser = {
            userId: auth?._id,
            username, email, password
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updateUser.profilePic = filename;

            try {
                await axios.post("/api/v1/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const { data } = await axios.put(`/api/v1/users/update/${auth?._id}`, updateUser);
            // window.location.reload();
            localStorage.removeItem("user");
            const user = localStorage.setItem("user", JSON.stringify(data))
            setAuth(data);
            navigate("/")
            console.log(user)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            axios.delete(`/api/v1/users/delete/${auth?._id}`, {
                data: {
                    userId: auth?._id
                }
            })
            localStorage.removeItem("user");
            message.success("Account deleted");
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle" onClick={ handleDelete }>Delete Your Account</span>
                </div>
                <form className="settingsForm" onSubmit={ handleUpdate }>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={ file ? URL.createObjectURL(file) : PF + auth?.profilePic } alt="" />
                        <label htmlFor="fileInput">
                            <i className='settingsPPIcon far fa-user-circle'></i>
                        </label>
                        <input type="file" onChange={ (e) => setFile(e.target.files[0]) } id='fileInput' className='hidden' />
                    </div>
                    <label>Username</label>
                    <input type="text" value={ username } onChange={ (e) => setUsername(e.target.value) } placeholder={ auth?.username } className='focus:outline-none' />
                    <label>Email</label>
                    <input type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } placeholder={ auth?.email } className='focus:outline-none' />
                    <label>Password</label>
                    <div className="pass flex justify-between border-b-2">
                        <input type={ show ? "text" : "password" } required value={ password } onChange={ (e) => setPassword(e.target.value) } placeholder='Change password or enter your old password' className='focus:outline-none w-[100%] py-1' />
                        <span className='showBtn relative py-1 mx-3 cursor-pointer' onClick={ () => setShow(!show) }>{ password === '' ? '' : show ? "Hide" : "Show" }</span>
                    </div>
                    <button className="settingsSubmit" >Update</button>
                </form>
            </div>
            <Sidebar />

        </div>
    )
}

export default Settings
