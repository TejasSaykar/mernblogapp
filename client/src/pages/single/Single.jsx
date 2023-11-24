import './single.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import SinglePost from '../../components/SinglePost/SinglePost'

const Single = () => {
    return (
        <div className='single'>
            <SinglePost />
            <Sidebar />
        </div>
    )
}

export default Single
