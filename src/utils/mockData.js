import { useEffect, useState } from "react";
import professions from "../app/mockData/professions.json";
import qualities from "../app/mockData/qualities.json";
import users from "../app/mockData/users.json";
import httpService from "../app/services/httpService";

const useMockData = () => {
    const statusConst = {
        idle: "Не началась...",
        pending: "В процессе...",
        successed: "Успешно загружены",
        error: "Произошла ошибка"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaCount = professions.length + qualities.length + users.length;
    const incremetnCount = () => {
        setCount((prevState) => {
            return prevState + 1;
        });
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }
        const newProgress = Math.floor((count / summaCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConst.successed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);
    async function initialize() {
        try {
            for (const prof of professions) {
                incremetnCount();
                await httpService.put("profession/" + prof._id, prof);
            }
            for (const user of users) {
                incremetnCount();
                await httpService.put("user/" + user._id, user);
            }
            for (const qual of qualities) {
                incremetnCount();
                await httpService.put("quality/" + qual._id, qual);
            }
        } catch (error) {
            setError(error);
            setStatus(statusConst.error);
        }
    }
    return { error, initialize, progress, status };
};

export default useMockData;
