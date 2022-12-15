import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentServices from "../services/commentService";
// import PropTypes from "prop-types";
import { toast } from "react-toastify";

const CommentsContex = React.createContext();

export const useComment = () => {
    return useContext(CommentsContex);
};

export const CommentsProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const { postId } = useParams();
    const { onlineUser } = useAuth();
    const [error, setError] = useState(null);
    useEffect(() => {
        getComments();
    }, [postId]);
    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: postId,
            created_at: Date.now(),
            userId: onlineUser._id
        };
        try {
            const { content } = await commentServices.createComment(comment);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCather(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function getComments() {
        try {
            const { content } = await commentServices.getComments(postId);
            setComments(content);
        } catch (error) {
            errorCather(error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }
    async function removeComment(id) {
        try {
            const { content } = await commentServices.removeComment(id);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            errorCather(error);
        }
    }

    return (
        <CommentsContex.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {children}
        </CommentsContex.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
