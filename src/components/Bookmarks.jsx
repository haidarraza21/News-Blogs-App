import React from 'react'
import './Model.css'
import demoImg from '../assets/images/demo.jpg'
import './Bookmarks.css'
import noImg from '../assets/images/no-img.png'

const Bookmarks = ({ show, bookmarks, onClose, onSelectArticle, onDeletebookmars }) => {
    if (!show) {
        return null
    }
    return (
        <div className='model-overlay'>
            <div className='model-content'>
                <span className='close-button' onClick={onClose} >
                    <i className='fa-solid fa-xmark'></i>
                </span>
                <h2 className="bookmarks-heading">BookMarked News</h2>
                <div className="bookmarks-list">
                    {bookmarks.map((articles, index) => (<div className="bookmarks-item" key={index} onClick={() => onSelectArticle(articles)}>
                        <img src={articles.image || noImg} alt={articles.title} />
                        <h3>
                            {articles.title}
                        </h3>
                        <span
                            className='delete-button' onClick={(e) => {
                                e.stopPropagation()
                                onDeletebookmars(articles)
                            }}>
                            <i className='fa-regular fa-circle-xmark'></i>
                        </span>
                    </div>))}



                </div>

            </div>
        </div>
    )
}

export default Bookmarks
