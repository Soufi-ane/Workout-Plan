import { useEffect, useState } from "react";
import Header from "../components/Header";

const Plans = [
    {
        plan: "plan1",
        days: [
            {
                day: "day1",
                exercises: [
                    {
                        exercise: "push up",
                        sets: [10, 12, 15],
                        time_between: 60, // in seconds
                    },
                    {
                        exercise: "pull up",
                        sets: [8, 10, 12],
                        time_between: 90, // in seconds
                    },
                ],
            },
            {
                day: "day2",
                exercises: [
                    {
                        exercise: "squats",
                        sets: [15, 20, 25],
                        time_between: 60, // in seconds
                    },
                    {
                        exercise: "lunges",
                        sets: [12, 15, 18],
                        time_between: 60, // in seconds
                    },
                ],
            },
        ],
    },
    {
        plan: "plan2",
        days: [
            {
                day: "day1",
                exercises: [
                    {
                        exercise: "plank",
                        sets: [60, 60, 60], // duration in seconds
                        time_between: 30, // in seconds
                    },
                    {
                        exercise: "mountain climbers",
                        sets: [20, 25, 30],
                        time_between: 45, // in seconds
                    },
                ],
            },
            {
                day: "day2",
                exercises: [
                    {
                        exercise: "burpees",
                        sets: [10, 12, 15],
                        time_between: 60, // in seconds
                    },
                    {
                        exercise: "sit ups",
                        sets: [20, 25, 30],
                        time_between: 60, // in seconds
                    },
                ],
            },
        ],
    },
];

function Home() {
    const ps = localStorage.getItem("plans");
    localStorage.setItem("plans", JSON.stringify(Plans));
    const isLoged = sessionStorage.getItem("isLoged");
    const [plans, setPlans] = useState(JSON.parse(ps));
    // useEffect(() => {
    //     setPlans((prev) => JSON.parse(ps));
    // }, [ps]);
    return (
        <div className="flex items-center flex-col gap-3 py-10">
            {plans.length &&
                plans?.map((plan) => (
                    <div onClick={() => {}} className="bg-red-500 flex flex-col h-60 w-11/12 justify-center items-center  rounded-xl" key={plan.plan}>
                        {plan.plan}
                    </div>
                ))}
        </div>
    );
}

export default Home;
