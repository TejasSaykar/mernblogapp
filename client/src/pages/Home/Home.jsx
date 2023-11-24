import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import './home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();
    // console.log(search)


    const getPosts = async () => {
        const { data } = await axios.get("/api/v1/post/all-posts" + search);
        // console.log(data);
        setPosts(data.posts)
    }

    useEffect(() => {
        getPosts();
    }, [search])

    return (
        <>
            <Header />
            <div className='home'>
                <Posts getPosts={posts} />
                <div className="sidebar">
                    <Sidebar />
                </div>
            </div>
        </>
    )
}

export default Home
