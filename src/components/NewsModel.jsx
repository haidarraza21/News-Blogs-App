import React from 'react'
import demoImg from '../assets/images/demo.jpg'
import './NewsModel.css'
import './Model.css'

const NewsModel = ({ show, articles, onClose }) => {
    if (!show) {
        return null
    }
    return (
        <div className='model-overlay'>
            <div className='model-content'>
                <span className='close-button' onClick={onClose}>
                    <i className='fa-solid fa-xmark'></i>
                </span>
                {articles && (
                    <>
                        <img src={articles.image} alt={articles.title} className='model-image' />
                        <h2 className="model-title">
                            {articles.title}
                        </h2>
                        <p className="model-source">Source: {articles.source?.name}</p>
                        <p className="model-date">
                            {new Date(articles.publishedAt).toLocaleString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            }
                            )}
                        </p>
                        <p className="model-content-text">
                            {articles.content}
                        </p>
                        <a href={articles.url} target='_blank'
                            rel='noopenerrer' className="read-more-link">Read More</a>
                    </>
                )}


            </div>
        </div>
    )
}

export default NewsModel
