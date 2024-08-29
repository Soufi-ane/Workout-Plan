import { useEffect, useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import Home from "./screens/Home";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "./context/DataContext";

const Plans = [
    {
        id: 0,
        plan: "plan1",
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
    localStorage.setItem("plans", JSON.stringify(Plans));
    const ps = localStorage.getItem("plans");
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

const CreateExercise = () => {
    const [image, setImage] = useState(null);
    const handleImage = (event) => {
        setImage((curr) => event.target.files[0]);
    };
    return (
        <div className="w-full h-[100dvh] font-bold flex items-center justify-center">
            <div>
                <div>
                    <img className="w-60 h-60" src={image ? URL.createObjectURL(image) : "./assets/gym.png"} />
                </div>
                <form>
                    <div className="w-60 relative">
                        <MdOutlineInsertPhoto size={60} className=" absolute top-0 left-0 w-20 h-10 bg-green-600" />
                        <input onChange={(e) => handleImage(e)} type="file" accept=".jpeg, .jpg, .png" className="absolute z-20 opacity-0 top-0 left-0 w-20 h-10 bg-red-500" />
                    </div>
                    <button>Upload</button>
                </form>
            </div>
        </div>
    );
};
