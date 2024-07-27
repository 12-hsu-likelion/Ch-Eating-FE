import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailedDailyAnalytics = () => {
    // 여기서 그냥 로딩되면 데이터 받아와도 될 듯?
    const location = useLocation();

    const {year, month, day} = location.state.dayInfo || {};

    return (
        <div>
            asdsadasda
        </div>
    );
};

export default DetailedDailyAnalytics;