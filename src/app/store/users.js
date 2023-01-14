import { createAction, createSlice } from "@reduxjs/toolkit";
import { generateAuthError } from "../../utils/generateAuthError";
import getRandomInt from "../../utils/getRandomInt";
import history from "../../utils/histore";
import authService from "../services/authService";
import localStorageSevice from "../services/localStorageService";
import userServices from "../services/userServices";

const initialState = localStorageSevice.getAccessToken()
    ? {
          entities: null,
          error: null,
          isLoading: true,
          auth: { userId: localStorageSevice.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          error: null,
          isLoading: false,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequestes: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.isLoggedIn = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLogOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userModifyed: (state, action) => {
            const index = state.entities.findIndex(
                (i) => i._id === action.payload._id
            );
            console.log(action.payload._id, index);
            state.entities[index] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequestes,
    usersReceved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLogOut,
    userModifyed,
    authRequested
} = actions;

// const authRequested = createAction("users/authRequested");
const userCreateRequsted = createAction("users/userCreateRequsted");
const userCreateFailed = createAction("users/userCreateFailed");
const userModifyRequsted = createAction("users/userModifyRequsted");
const userModifyFailed = createAction("users/userModifyFailed");

const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequsted());
    try {
        const { content } = await userServices.create(payload);
        dispatch(userCreated(content));
        history.push("/users");
    } catch (error) {
        dispatch(userCreateFailed(error.message));
    }
};

export const modifyUser = (payload) => async (dispatch) => {
    dispatch(userModifyRequsted());
    try {
        const { content } = await userServices.patch(payload);
        dispatch(userModifyed(content));
    } catch (error) {
        dispatch(userModifyFailed(error.message));
    }
};

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        dispatch(authRequested());
        const { email, password } = payload;
        try {
            const data = await authService.login({ email, password });
            localStorageSevice.setToken(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageSevice.setToken(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    password,
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    rate: getRandomInt(1, 5),
                    comletedMeetings: getRandomInt(0, 200),
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const logOutUser = () => (dispatch) => {
    localStorageSevice.removeAuthData();
    dispatch(userLogOut());
    history.push("/");
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequestes());
    try {
        const { content } = await userServices.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getOnlineUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUsersById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getOnlineUserId = () => (state) => state.users.auth.userId;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
