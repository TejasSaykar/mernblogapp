import Post from '../post/Post'
import './posts.css'

const Posts = ({ getPosts }) => {

    return (
        <div className='posts'>
            {
                getPosts?.map((p) => (
                    <Post key={p._id} post={p} />
                ))
            }

        </div>
    )
}

export default Posts
