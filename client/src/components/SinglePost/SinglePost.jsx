import { Link, useLocation, useNavigate } from 'react-router-dom'
import './singlepost.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { message } from 'antd';

const SinglePost = () => {
    const location = useLocation();
    const id = (location.pathname.split('/')[2]);
    // console.log(location)
    const navigate = useNavigate();

    const [post, setPost] = useState([]);
    const [auth] = useAuth();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    // console.log(title, desc)zz

    const PF = "http://localhost:8800/images/"

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await axios.get(`/api/v1/post/get-post/${id}`);
            // console.log(data.post)
            setPost(data.post);
            setTitle(data.post.title);
            setDesc(data.post.desc)
        }
        fetchPost();
    }, [id])


    const handleDelete = async () => {
        try {
            await axios.delete(`/api/v1/post/delete-post/${id}`, {
                data: { username: auth?.username }
            });
            message.success("Post deleted");
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        try {
            const { data } = await axios.put(`/api/v1/post/update-post/${id}`, {
                title, desc, username: auth.username
            });
            // window.location.reload();
            message.success("Updated successfully");
            setUpdateMode(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo &&
                    <img src={PF + post.photo} alt={post.title} className="singlePostImg" />
                }
                {
                    updateMode ? <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='flex justify-center align-middle w-full text-center text-2xl outline-none my-2 singlePostTitleUpdate'
                        autoFocus
                    /> :

                        <h1 className="singlePostTitle text-2xl">
                            {title}
                            <div className="singlePostEdit">
                                {post?.username === auth?.username &&
                                    <>
                                        <i className='singlePostIcon far fa-edit' onClick={() => setUpdateMode(true)}></i>
                                        <i className='singlePostIcon far fa-trash-alt' onClick={handleDelete}></i>
                                    </>
                                }
                            </div>
                        </h1>
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author :
                        <Link to={auth?.username ? `/?user=${post.username}` : "/login"}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ?
                    <div className='flex justify-between'>
                        <textarea
                            type='text'
                            value={desc}
                            className='singlePostDesc w-full outline-none ml-8'
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <button className='bg-teal-700 flex my-3 left-3 self-end p-2 px-4 rounded-sm text-white' type='submit' onClick={handleUpdate}>Update</button>
                    </div>
                    :
                    <p className='singlePostDesc'>
                        {desc}
                    </p>
                }


            </div>
        </div>
    )
}

export default SinglePost
