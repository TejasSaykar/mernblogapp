import { useAuth } from '../../context/AuthContext';
import './topbar.css'
import { Link, useNavigate } from 'react-router-dom'
// import { Modal, Input } from 'antd'
// import { useEffect, useState } from 'react';
// import axios from 'axios';

const Topbar = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    const PF = "http://localhost:8800/images/"
    // const [show, setShow] = useState(false);


    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topIcon fa-brands fa-linkedin"></i>
                <i className="topIcon fa-brands fa-square-twitter"></i>
                <i className="topIcon fa-brands fa-square-pinterest"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <Link to={'/'} className="topListItems">HOME</Link>
                    <Link className="topListItems">ABOUT</Link>
                    <Link className="topListItems">CONTACT</Link>
                    <Link to={auth?.username ? '/write' : "/login"} className="topListItems">WRITE</Link>
                    {auth?.username &&
                        <Link className="topListItems" onClick={() => { navigate("/login"), localStorage.removeItem("user"), window.location.reload() }}>LOGOUT</Link>
                    }
                </ul>
            </div>
            <div className="topRight">
                {auth?.username ?
                    <>
                        <span className='mx-2 text-2xl font-light' style={{ fontFamily: "Josefin Sans" }}>{auth?.username}</span>
                        <Link to={'/settings'}>
                            <img className='topImg' src={auth?.profilePic ? PF + auth?.profilePic : "/Images/profile.jpg"} alt="" />
                        </Link>
                    </>
                    :
                    <>
                        <Link className='font-light text-lg' to={'/login'}>LOGIN</Link>
                        <Link className='mx-3 font-light text-lg' to={'/register'}>REGISTER</Link>
                    </>
                }
                {/* <i className="topSearchIcon fa-solid fa-magnifying-glass" onClick={() => setShow(true)}></i>
                {
                    setShow &&
                    <Modal onCancel={() => setShow(false)} open={show} footer={null}>
                        <form>
                            <Input type="text" placeholder='Search' />
                            <button className='bg-teal-600 py-2 px-3 my-2 rounded-sm'>Search</button>
                        </form>
                    </Modal>
                } */}
            </div>
        </div>
    )
}

export default Topbar
