import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { RxLapTimer } from "react-icons/rx";
import { TiPlus } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";

export default function Day() {
    const [exercises, setExercises] = useState([]);
    const { plans, setPlans } = useContext(DataContext);
    const { PLAN, DAY } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        let e = [];
        plans[PLAN]?.days?.map((day, index) => {
            e.push(day.exercises[index]);
        });
        setExercises([...e]);
    }, [plans, PLAN]);

    return (
        <div className="flex items-center flex-col gap-5 py-10">
            {exercises &&
                exercises.map((e) => (
                    <div className="bg-stone-200 rounded-lg flex-col  flex items-center pb-5 pt-3 w-10/12" key={Math.random()}>
                        <p className="h-9 text-center">{e.exercise}</p>
                        <div className="flex p-2 gap-10 items-center rounded-md bg-white w-11/12 ">
                            <img className="h-20 bg-stone-200 rounded-md w-20" src="/Workout-Plan/assets/gym.png" />
                            <div className="flex flex-col">
                                {e.sets.length <= 5 ? (
                                    e.sets.map((set) => (
                                        <div className="flex items-center" key={Math.random()}>
                                            <TiPlus className=" rotate-45" size={15} />
                                            <p> {set}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center">
                                        <TiPlus className=" rotate-45" size={15} /> <p>5+</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-1 flex gap-1 flex-col justify-center items-center ml-8">
                                <RxLapTimer size={20} />
                                <p>{e.time_between}</p>
                            </div>
                        </div>
                    </div>
                ))}
            <FaPlay
                onClick={() => {
                    navigate("play");
                }}
                size={40}
                className=" absolute bottom-10"
            />
        </div>
    );
}
