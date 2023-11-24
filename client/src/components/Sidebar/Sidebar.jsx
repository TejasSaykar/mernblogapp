import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [cat, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const { data } = await axios.get("/api/v1/category/all-category");
            setCats(data.allCats)
        }
        getCats();
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="/Images/aboutImg.jpeg" alt="" />
                <p>Lorem ipsum dolor sit elit. molestiae reprehenderit totam facilis voluptas corporis, eius sit.</p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cat?.map((c) => (
                        <Link key={c._id} to={`/?cat=${c.name}`}>
                            <li className="sidebarListItem mx-3">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-linkedin"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
