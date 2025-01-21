import React, { useState } from 'react'
import userImg from '../assets/images/user1.png'
import noImg from '../assets/images/no-img.png'
import './Blogs.css'

const Blogs = ({ onBack, onCreateBlog }) => {

    const [showForm, setShowForm] = useState(false)
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [submited, setSubmited] = useState(false)

    const handleImageChange = (e) => { // Corrected function name here
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const newBlog = {
            image: image || noImg,
            title,
            content,
        }
        onCreateBlog(newBlog)
        setImage(null)
        setTitle('')
        setContent('')
        setShowForm(false)
        setSubmited(true)
        setTimeout(() => {
            setSubmited(false)
            onBack()
        }, 3000)
    }



    return (
        <div className='blogs'>
            <div className="blogs-left">
                <img src={userImg} alt="User Image" />
            </div>
            <div className="blogs-right">
                {!showForm && !submited && (
                    <button className='post-btn' onClick={() => setShowForm(true)}>Create New Post </button>
                )}
                {submited && <p className='submission-message'
                >Post Submittrd!</p>}
                <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
                    <h1>New Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="img-upload">
                            <label htmlFor="file-upload" className='file-upload'>
                                <i className='bx bx-upload'></i> Upload Image
                            </label>
                            <input type="file" id='file-upload' onChange={handleImageChange} />
                        </div>
                        <input type="text" placeholder='Add Title (Max 60 Characters'
                            className='title-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea className='text-input' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Add Text'></textarea>
                        <button type='submit' className='submit-btn'>Submit Button</button>

                    </form>
                </div>


                <button className='blogd-close-btn' onClick={onBack}>Back <i className='bx bx-chevron-right'></i></button>
            </div>
        </div>
    )
}

export default Blogs
