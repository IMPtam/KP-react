import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import CommentsList, { AddCommentForm } from "../common/comments";

import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getCommentLoadingStatus,
    getComments,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getOnlineUserId } from "../../store/users";

const Comments = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const onlineUserId = useSelector(getOnlineUserId());
    const comments = useSelector(getComments());

    const isLoadingComment = useSelector(getCommentLoadingStatus());
    useEffect(() => {
        dispatch(loadCommentsList(postId));
    }, [postId]);

    const handleSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                _id: nanoid(),
                pageId: postId,
                created_at: Date.now(),
                userId: onlineUserId
            })
        );
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoadingComment ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Загрузка ком..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
