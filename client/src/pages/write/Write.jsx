import { useState } from 'react'
import './write.css'
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Write = () => {

    const navigate = useNavigate();
    const [auth] = useAuth()

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: auth?.username,
            title,
            desc,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/api/v1/upload", data);
            } catch (error) {
                // console.log(error);
            }

            try {
                const { data } = await axios.post("/api/v1/post/create-post", newPost);
                navigate(`/post/${data?.post._id}`,)
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <div className='write'>
            {file &&
                <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
            }
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className='writeIcon fas fa-plus'></i>
                    </label>
                    <input type="file" id='fileInput' onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                    <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='writeInput' autoFocus={true} />

                    {/* <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Category' className='writeInput' autoFocus={true} /> */}
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder='Tell your story...'
                        type='text'
                        name='desc'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className='writeInput writeText'
                    ></textarea>
                </div>

                <button className="writeSubmit">Publish</button>

            </form>
        </div>
    )
}

export default Write
