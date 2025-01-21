import React, { useState } from 'react'
import News from './components/News';
import Blogs from './components/Blogs';

import 'boxicons/css/boxicons.min.css'; // Ensure this import is present at the top of your file



const App = () => {

  const [showNews, setShowNews] = useState(true)
  const [showBlogs, setShowBlogs] = useState(false)
  const [blogs, setBlogs] = useState([])

  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlog) => [...prevBlog, newBlog])
  }

  const handleShowBlogs = () => {
    setShowNews(false)
    setShowBlogs(true)
  }
  const handleBaackToNews = () => {
    setShowNews(true)
    setShowBlogs(false)
  }
  return (
    <div className='container'>
      <div className='news-blog-app'>
        {showNews && <News onShowBlogs={handleShowBlogs} Blogs={blogs} />}
        {showBlogs && <Blogs onBack={handleBaackToNews} onCreateBlog={handleCreateBlog} />}

      </div>

    </div>
  )
}

export default App
