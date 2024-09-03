import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const plansState = {
    plans: [],
};

const getPlans = () => {
    return JSON.parse(localStorage.getItem("plans")) || [];
};

const plansSlice = createSlice({
    name: "plans",
    initialState: getPlans(),
    reducers: {
        addPlan: (state, action) => {
            state?.push({
                id: state.length,
                plan: action.payload,
                days: [],
            });
        },
        deletePlan: (state, action) => {
            const newPlans = state.filter((p) => p.id !== action.payload);
            return newPlans;
        },
        deleteDay: (state, action) => {
            const { plan, day } = action.payload;
            state[plan].days = state[plan].days.filter((d) => d.id !== day);
        },
        addDay: (state, action) => {
            const { plan, day } = action.payload;
            state[plan]?.days.push({
                id: state[plan].days.length,
                day,
                exercises: [],
            });
        },
        addExercise: (state, action) => {
            const { plan, day, exercise, sets, time_between, image } = action.payload;

            const exercises = state[plan]?.days[day].exercises;
            state[plan].days[day].exercises = [
                ...exercises,
                {
                    id: exercises.length,
                    exercise,
                    sets,
                    time_between,
                    image,
                },
            ];
        },
        deleteExercise: (state, action) => {
            const { plan, day, id } = action.payload;
            const NewExercises = state[plan]?.days[day].exercises.filter((e) => e.id !== id);
            state[plan].days[day].exercises = NewExercises;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateLocalStorage.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success(action.payload);
        });
    },
});

export const updateLocalStorage = createAsyncThunk("plans/updateLocalStorage", async (id, { getState }) => {
    const { plans } = getState();
    localStorage.setItem("plans", JSON.stringify(plans));
    return id;
});

export default plansSlice.reducer;
export const { addPlan, deletePlan, addDay, deleteDay, addExercise, deleteExercise } = plansSlice.actions;
