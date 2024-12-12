import React, { useState, useEffect } from 'react';
import pic1 from "../../../src/assets/1.jpeg";
import pic2 from "../../../src/assets/4.jpg";
import pic23 from "../../../src/assets/2.jpeg";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios.js";
import moment from 'moment-jalaali';
import DefaultImage from '../../assets/StyleForm/default-image.jpg'
function MainPage() {
    const pictures = [pic1, pic2, pic23];
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, news.length);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleDownload = (filePath) => {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop(); // Set the filename for download
        link.click();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPictureIndex(current => (current + 1) % pictures.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [pictures]);


    useEffect(() => {
        apiInstance.get('news/').then((res) => {
            setNews(res.data);
        })
    }, []);

    const shamsiDate = (date) => {
        return moment(date).format('jYYYY/jMM/jDD');
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={pictures[currentPictureIndex]} alt={`Picture ${currentPictureIndex + 1}`}
                     style={{width: '100%', height: '20%'}}/>
            </div>
            <br/>
            <br/>
            <div style={{textAlign: 'center'}}>
                <Link
                    to="/teams-register/"
                    style={{
                        display: 'inline-block',
                        padding: '20px 55px',
                        backgroundColor: 'transparent',
                        color: '#000000',
                        textDecoration: 'none',
                        borderRadius: '70px', // Increased border radius for smoother corners
                        transition: 'background-color 1s',
                        border: '11px solid #007bff'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#bfabd8'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    <h3> مشاهده تیم های ثبت نام شده </h3>
                </Link>
            </div>

            <br/>
            <br/>
            <hr/>
            <div style={{textAlign: 'center'}}>
                <h3 style={{fontSize: '2rem', color: 'blue', marginBottom: '10px'}}>آخرین اخبار</h3>
            </div>

            <div>
                {news.slice(startIndex, endIndex).map((n, index) => (
                    <Link to={`news/${n?.nid}/`} key={index}>
                        <figure className="snip1360">
                            <img style={{borderRadius: '10%', objectFit: 'cover'}} src={n?.image || DefaultImage}
                                 alt="sample"/>
                            <figcaption>
                                <h2 style={{textAlign: 'right'}}>{n?.title}</h2>
                                <small style={{marginLeft: '100%'}}
                                       className="published-date">{shamsiDate(n?.date)}</small>
                                <p style={{textAlign: 'right'}}>{n?.content.split(' ').slice(0, 8).join(' ')}{n?.content.split(' ').length > 8 && '...'}</p>
                            </figcaption>
                        </figure>
                    </Link>
                ))}

                <div style={{backgroundColor: 'silver' ,display: 'flex', justifyContent: 'center', marginTop: '20px', padding: '1px'}}>
                    {Array.from({length: Math.ceil(news.length / itemsPerPage)}, (_, i) => (
                        <button key={i} style={{
                            margin: '5px',
                            padding: '4px 7px',
                            backgroundColor: '#000000',
                            color: 'white',
                            border: '2px solid #ccc',
                            cursor: 'pointer'
                        }} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    ))}
                </div>

            </div>

            <br/>
            <hr/>
            <div style={{textAlign: 'center'}}>
                <h3 style={{fontSize: '2rem', color: 'darkred', marginBottom: '20px'}}> دانلود PDF قوانین و مقررات </h3>
                <i className="fa-solid fa-file-pdf "></i> <span
                onClick={() => handleDownload('../../../src/assets/a.pdf')}
                style={{cursor: 'pointer'}}
            >
                    دانلود فایل شماره ۱
            </span>
                <br/>
                <br/>
                <i className="fa-solid fa-file-pdf "></i> <span
                onClick={() => handleDownload('../../../src/assets/b.pdf')}
                style={{cursor: 'pointer'}}
            >
                دانلود فایل شماره ۲
            </span>
            </div>
        </>
    )

}

export default MainPage;