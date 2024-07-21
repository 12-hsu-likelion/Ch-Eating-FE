import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Banner_arrowLeft from '../../assets/images/banner_arrowLeft.png';
import Banner1 from '../../assets/images/banner1.png';
import Banner2 from '../../assets/images/banner2.png';
import Banner3 from '../../assets/images/banner3.png';

const BannerContainer = styled.div`
    width: 100%;
    height: 19.6rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BannerImage = styled.img`
    width: 100%;
    height: 100%;
`

const BannerArrowContainer = styled.div`
    position: absolute;
    width: 85%;
    display: flex;
    justify-content: space-between;
    z-index: 2;
`

const BannerArrowImg = styled.img`
    width: 1.55rem;
    cursor: pointer;
`

const banners = [Banner1, Banner2, Banner3];

const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToNextBanner = () => {

        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const goToPreviousBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <BannerContainer>
            <BannerImage src={banners[currentBanner]} alt={`Banner ${currentBanner + 1}`} />
            <BannerArrowContainer>
                <BannerArrowImg src={Banner_arrowLeft} alt="left" onClick={goToPreviousBanner} />
                <BannerArrowImg src={Banner_arrowLeft} alt="right" style={{ transform: "rotate(180deg)" }} onClick={goToNextBanner} />
            </BannerArrowContainer>
        </BannerContainer>
    );
}

export default Banner;
