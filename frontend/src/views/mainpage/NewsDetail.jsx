import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import apiInstance from "../../utils/axios.js";
import {useParams} from "react-router-dom";
import moment from 'moment-jalaali';

const Container = styled.div`
    max-width: 58%;
    margin: 0 auto;
    padding: 25px;
    border-radius: 40px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.23);
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #000000;
    font-family: "Noto Sans Arabic SemCond Thin";

`;

const Image = styled.img`
  width: 100%; 
  height: auto; 
  border-radius: 25px; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
    font-size: 18px;
    color: #494747;
    font-family: "Noto Sans Arabic SemCond Thin";

`;

function NewsDetail() {

    const shamsiDate = (date) => {
        return moment(date).format('jYYYY/jMM/jDD');
    };

    const param = useParams()
    const [newsDetail, setNewsDetail] = useState()

    useEffect(() => {
        apiInstance.get(`news-deatil/${param?.nid}/`).then((res) => {
            setNewsDetail(res.data);
        })
    }, []);

    return (
        <>
            <br/>
            <Container>
                <br/>
                <Title>{newsDetail?.title}</Title>
                <small className="published-date">{shamsiDate(newsDetail?.date)}</small>
                <hr/>
                <br/>
                {newsDetail?.image &&
                    <Image src={newsDetail?.image} alt="Breaking News Image"/>
                }
                <br/>
                <br/>

                <Description>{newsDetail?.content}</Description>
            </Container>
        </>
    );
}

export default NewsDetail;
