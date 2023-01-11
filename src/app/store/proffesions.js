import { createSlice } from "@reduxjs/toolkit";
import professionServices from "../services/professionService";

const proffesionsSlice = createSlice({
    name: "professions",
    initialState: { entities: null, error: null, isLoading: null },
    reducers: {
        professionsRequestes: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = proffesionsSlice;
const { professionsRequestes, professionsReceved, professionsRequestFailed } =
    actions;

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(professionsRequestes());
    try {
        const { content } = await professionServices.get();
        dispatch(professionsReceved(content));
    } catch (error) {
        dispatch(professionsRequestFailed(error.message));
    }
};

export const getProffesions = () => (state) => state.professions.entities;
export const getProfessionLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionByIds = (proffesionsId) => (state) => {
    if (state.professions.entities) {
        for (const profId of state.professions.entities) {
            if (profId._id === proffesionsId) {
                return profId;
            }
        }
        return [];
    }
};

export default professionsReducer;
