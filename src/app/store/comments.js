import { createSlice } from "@reduxjs/toolkit";
import commentServices from "../services/commentService";

const commentSlice = createSlice({
    name: "comments",
    initialState: { entities: null, error: null, isLoading: null },
    reducers: {
        commentsRequestes: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreated: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        commentsRemoved: (state, action) => {
            console.log("action.payload", action.payload);
            console.log("state.entities", state.entities);
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentSlice;
const {
    commentsRequestes,
    commentsReceved,
    commentsRequestFailed,
    commentsCreated,
    commentsRemoved
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequestes());
    try {
        const { content } = await commentServices.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    // console.log("CreatedComment", data);
    dispatch(commentsRequestes());
    try {
        const { content } = await commentServices.createComments(data);
        dispatch(commentsCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export const removeComment = (id) => async (dispatch) => {
    dispatch(commentsRequestes());
    console.log(id);
    try {
        const { content } = await commentServices.removeComments(id);
        console.log(content);
        dispatch(commentsRemoved(id));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentLoadingStatus = () => (state) =>
    state.comments.isLoading;
export default commentsReducer;

// api.comments
//     .add({ ...data, pageId: postId })
//     .then((data) => setComments([...comments, data]));

// api.comments.remove(id).then((id) => {
//     setComments(comments.filter((x) => x._id !== id));
// });
