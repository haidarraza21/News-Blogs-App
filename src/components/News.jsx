import React, { useEffect, useState } from 'react'
import Calender from './Calender'
import Weather from './Weather'
import './News.css'
import userImg from '../assets/images/user1.png'
import noImg from '../assets/images/no-img.png'
import blogImg1 from '../assets/images/blog1.jpg'
import blogImg2 from '../assets/images/blog2.jpg'
import blogImg3 from '../assets/images/blog3.jpg'
import blogImg4 from '../assets/images/blog4.jpg'

import axios from 'axios'
import NewsModel from './NewsModel'
import Bookmarks from './Bookmarks'


const categories = [
    'general',
    'world',
    'business',
    'entertainment',
    'sports',
    'science',
    'health',
    'nation',
]


const News = ({ onShowBlogs, Blogs }) => {
    const [headline, setHeadline] = useState(null)
    const [nesw, setNews] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('general')
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showModel, setShowModel] = useState(false)
    const [selectArticle, setSelectArticle] = useState(null)
    const [bookmarks, setBookmarks] = useState([])
    const [showBookmarksModel, setShowBookmarksModel] = useState(false)


    useEffect(() => {
        const fetchNews = async () => {
            let url = ` https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=d5ca2fffa45a8526dc313a32b0883219`

            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}& lang=en&apikey=d5ca2fffa45a8526dc313a32b0883219`
            }

            const response = await axios.get(url)
            const fetchedNews = response.data.articles

            fetchedNews.forEach((articles) => {
                if (!articles.image) {
                    articles.image = noImg
                }
            });

            setHeadline(fetchedNews[0])
            setNews(fetchedNews.slice(1, 7))

            const saveBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
            setBookmarks(saveBookmarks)

            console.log()
        }
        fetchNews()
    }, [selectedCategory, searchQuery])

    const handleCategoryClick = (e, category) => {
        e.preventDefault(); // Correct method name
        setSelectedCategory(category);
    };

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery(searchInput)
        setSearchInput('')
    }

    const handleArcticleClick = (articles) => {
        setSelectArticle(articles)
        setShowModel(true)

        console.log(articles)
    }

    const handleBookmarkClick = (articles) => {
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks = prevBookmarks.find((bookmarks) => bookmarks.title === articles.title) ?
                prevBookmarks.filter((bookmarks) => bookmarks.title !== articles.title) : [...prevBookmarks, articles]
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
            return updatedBookmarks
        })
    }

    return (
        <div className='nesw'>
            <header className='news-header'>
                <h1 className='logo'>News & Blogs</h1>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Search News..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button type='submit'>
                            <i className='fa-solid fa-magnifying-glass'></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className="news-content">
                <div className="navbar">
                    <div className="user" onClick={onShowBlogs}>
                        <img src={userImg} alt="User Img" />
                        <p>Raza Blog</p>
                    </div>
                    <nav className="categories">
                        <h1 className="nav-heading">Categories</h1>
                        <div className="nav-links">
                            {categories.map((category) => (<a href="#"
                                key={category}
                                className='nav-link'
                                onClick={(e) => handleCategoryClick(e, category)}
                            >{category}
                            </a>
                            ))}

                            <a href="#" className='nav-link' onClick={() => setShowBookmarksModel(true)}>
                                Bookmark <i className="fa-solid fa-bookmark"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (<div className="headline" onClick={() => handleArcticleClick(headline)}>
                        <img src={headline.image || noImg} alt="" />
                        <h2 className="headline-title">
                            {headline.title}
                            <i
                                className={`${bookmarks.some((bookmarks) => bookmarks.title === headline.title)
                                    ? 'fa-solid'
                                    : 'fa-regular'

                                    } fa-bookmark bookmark`} onClick={(e) => {
                                        e.stopPropagation()
                                        handleBookmarkClick(headline)
                                    }}></i>
                        </h2>
                    </div>
                    )}


                    <div className="news-grid">
                        {nesw.map((articles, index) => (
                            <div key={index} className="news-grid-item" onClick={() => handleArcticleClick(articles)}>
                                <img src={articles.image || noImg} alt="" />
                                <h6>
                                    {articles.title}
                                    <i
                                        className={`${bookmarks.some((bookmarks) => bookmarks.title === articles.title)
                                            ? 'fa-solid'
                                            : 'fa-regular'

                                            } fa-bookmark bookmark`} onClick={(e) => {
                                                e.stopPropagation()
                                                handleBookmarkClick(articles)
                                            }}></i>
                                </h6>
                            </div>
                        ))}


                    </div>
                </div>
                <NewsModel show={showModel} articles={selectArticle} onClose={() => setShowModel(false)} />
                <Bookmarks show={showBookmarksModel}
                    bookmarks={bookmarks}
                    onClose={() => setShowBookmarksModel(false)}
                    onSelectArticle={handleArcticleClick}
                    onDeletebookmars={handleBookmarkClick}
                />
                <div className="my-blogs">
                    <h1 className="my-blogs-heading">My Blogs</h1>
                    <div className="blog-posts">
                        {Blogs.map((blog, index) => (
                            <div key={index} className="blog-post">
                                <img src={blog.image || noImg} alt={blog.title} />
                                <h3>{blog.title}</h3>
                                {/* <p>{blog.content}</p> */}
                                <div className="post-button">
                                    <button className="edit-post">
                                        <i className='bx bxs-edit'></i>
                                    </button>
                                    <button className="delete-post">
                                        <i className='bx bxs-x-circle'></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="weather-calender">
                    <Weather />
                    <Calender />
                </div>

            </div>
            <footer className="news-footer">
                <p>
                    <span>News & Blogs App</span>
                </p>
                <p >Designed with ❤️ by <a href="https://haidarraza21.github.io/haidar/">Md Haidar Raza</a></p>
                <p>&copy; All Right Reserve. By Code And Create</p>
            </footer>
        </div>
    )
}

export default News
