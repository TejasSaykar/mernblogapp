
import { useState } from 'react'
import './post.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Post = ({ post }) => {
    const [auth] = useAuth();
    const PF = "http://localhost:8800/images/"
    return (
        <div className='post'>
            <img className='postImg' src={PF + post.photo} alt="Image" />
            <div className="postInfo">
                <div className="postCats">
                    {post?.categories?.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link to={auth?.username ? `/post/${post._id}` : "/login"}>
                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>

                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    )
}

export default Post
