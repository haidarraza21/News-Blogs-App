import React, { useEffect, useState } from 'react'
import News from './components/News';
import Blogs from './components/Blogs';

import 'boxicons/css/boxicons.min.css'; // Ensure this import is present at the top of your file



const App = () => {

  const [showNews, setShowNews] = useState(true)
  const [showBlogs, setShowBlogs] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const saveBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    setBlogs(saveBlogs)
  }, [])

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlog) => {
      const updatedBlogs = isEdit
        ? prevBlog.map((blog) => (blog === selectedPost ? newBlog : blog))

        : [...prevBlog, newBlog]
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
    setIsEditing(false)
    setSelectedPost(null)
  }

  const handleEditBlog = (blog) => {
    setSelectedPost(blog)
    setIsEditing(true)
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlog) => {
      const updateBlogs = prevBlog.filter((blog) => blog
        !== blogToDelete)
      localStorage.setItem('blogs', JSON.stringify(updateBlogs))
      return updateBlogs
    })
  }

  const handleShowBlogs = () => {
    setShowNews(false)
    setShowBlogs(true)
  }
  const handleBaackToNews = () => {
    setShowNews(true)
    setShowBlogs(false)
    setIsEditing(false)
    setSelectedPost(null)
  }
  return (
    <div className='container'>
      <div className='news-blog-app'>
        {showNews &&
          <News
            onShowBlogs={handleShowBlogs}
            Blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handleDeleteBlog}
          />}
        {showBlogs &&
          <Blogs
            onBack={handleBaackToNews}
            onCreateBlog={handleCreateBlog}
            editPost={handleCreateBlog}
            isEditing={isEditing}
          />}

      </div>

    </div>
  )
}

export default App
