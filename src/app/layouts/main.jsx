import React from "react";
import useMockData from "../../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <div className="container mt-5">
            <h2>Главная страница</h2>
            <h4>Инициализация данных в FireBase</h4>
            <ul>
                <li>Статус: {status}</li>
                <li>Прогресс: {progress}</li>
                {error && <li>Ошибка: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Загрузить..
            </button>
        </div>
    );
};

export default Main;
