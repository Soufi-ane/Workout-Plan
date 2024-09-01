import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const plansState = {
    plans: [],
};

const getPlans = () => {
    let plans = localStorage.getItem("plans");
    return plans ? JSON.parse(plans) : [];
};

const plansSlice = createSlice({
    name: "plans",
    initialState: getPlans(),
    reducers: {
        addPlan: (state, action) => {
            state.push({
                id: state.length,
                plan: action.payload,
                days: [],
            });
        },
        addDay: (state, action) => {
            const { plan, day } = action.payload;
            state[plan].days = [
                ...state[plan].days,
                {
                    id: state[plan].days.length,
                    day,
                    exercises: [],
                },
            ];
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
});

export const updateLocalStorage = createAsyncThunk("plans/updateLocalStorage", async (_, { getState }) => {
    const plans = getState().plans;
    localStorage.setItem("plans", JSON.stringify(plans));
});

export default plansSlice.reducer;
export const { addPlan, addDay, addExercise, deleteExercise } = plansSlice.actions;
