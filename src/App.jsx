import { useEffect, useState } from "react";

import Home from "./screens/Home";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "./context/DataContext";

const Plans = [
    {
        id: 0,
        plan: "plan1",
        description: "work hard",
        days: [
            {
                id: 0,
                day: "day one baby",
                exercises: [
                    {
                        id: 0,
                        exercise: "push up",
                        sets: [10, 12, 15, 10, 12, 15, 10, 12, 15, 10, 12, 15],
                        time_between: 60, // in seconds
                    },
                    {
                        id: 1,
                        exercise: "pull up",
                        sets: [8, 10, 12],
                        time_between: 90, // in seconds
                    },
                ],
            },
            {
                id: 1,
                day: "day2 nigga",
                exercises: [
                    {
                        id: 0,
                        exercise: "squats",
                        sets: [15, 20, 25],
                        time_between: 60, // in seconds
                    },
                    {
                        id: 1,
                        exercise: "lunges",
                        sets: [12, 15, 18],
                        time_between: 60, // in seconds
                    },
                ],
            },
        ],
    },
    {
        id: 1,
        plan: "plan2",
        description: "who's gonna carry the boats",
        days: [
            {
                id: 0,
                day: "the bulk",
                exercises: [
                    {
                        id: 0,
                        exercise: "plank",
                        sets: [60, 60, 60], // duration in seconds
                        time_between: 30, // in seconds
                    },
                    {
                        id: 1,
                        exercise: "mountain climbers",
                        sets: [20, 25, 30],
                        time_between: 45, // in seconds
                    },
                    {
                        id: 2,
                        exercise: "plank",
                        sets: [60, 60, 60], // duration in seconds
                        time_between: 30, // in seconds
                    },
                    {
                        id: 3,
                        exercise: "mountain climbers",
                        sets: [20, 25, 30],
                        time_between: 45, // in seconds
                    },
                    {
                        id: 4,
                        exercise: "plank",
                        sets: [60, 60, 30, 45, 60], // duration in seconds
                        time_between: 30, // in seconds
                    },
                    {
                        id: 5,
                        exercise: "mountain climbers",
                        sets: [20, 25, 30, 30, 45],
                        time_between: 45, // in seconds
                    },
                    {
                        id: 6,
                        exercise: "plank",
                        sets: [60, 45, 30, 45, 60, 60], // duration in seconds
                        time_between: 30, // in seconds
                    },
                    {
                        id: 7,
                        exercise: "mountain climbers",
                        sets: [20, 25, 30, 45, 54, 45],
                        time_between: 45, // in seconds
                    },
                ],
            },
            {
                id: 1,
                day: "the cut",
                exercises: [
                    {
                        id: 0,
                        exercise: "burpees",
                        sets: [10, 12, 15],
                        time_between: 60, // in seconds
                    },
                    {
                        id: 1,
                        exercise: "sit ups",
                        sets: [20, 25, 30],
                        time_between: 60, // in seconds
                    },
                ],
            },
        ],
    },
];

function App() {
    // localStorage.setItem("plans", JSON.stringify(Plans));
    const ps = localStorage.getItem("plans") || "[]";
    const [plans, setPlans] = useState(JSON.parse(ps));

    const navigate = useNavigate();

    return (
        <DataContext.Provider
            value={{
                plans,
                setPlans,
            }}>
            <div
                style={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontStyle: "normal",
                }}>
                <Header />
                <Outlet />
            </div>
        </DataContext.Provider>
    );
}

export default App;
