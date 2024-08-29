import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";

export default function Play() {
    const [exercises, setExercises] = useState([]);
    const { plans, setPlans } = useContext(DataContext);
    const { PLAN, DAY } = useParams();
    const [selected, setSelected] = useState(0);
    const [exercise, setExercise] = useState(0);
    const containerRef = useRef(null);

    const scrollLeft = () => {
        containerRef.current.style.overflowX = "auto";
        containerRef.current.scroll({
            left: window.innerWidth + 500,
            behavior: "smooth",
        });

        setTimeout(() => {
            containerRef.current.scroll({
                top: 0,
                behavior: "smooth",
            });
        }, 550);
        containerRef.current.style.overflowX = "hidden";
    };

    useEffect(() => {
        let e = [];
        plans[PLAN]?.days?.map((day, index) => {
            e.push(day.exercises[index]);
        });
        setExercises([...e]);
        console.log(exercises);
    }, [plans, PLAN]);

    return (
        <div ref={containerRef} className="py-20 h-[100dvh] px-5 gap-5  overflow-x-hidden whitespace-nowrap flex felx-col">
            {exercises &&
                exercises.map((e) => (
                    <div key={Math.random()} className="flex flex-col items-center flex-shrink-0  ">
                        <p className="mb-5">{e.exercise}</p>
                        <img className=" w-[90vw] h-[90vw] bg-stone-200 rounded-lg" src="/Workout-Plan/assets/pushup.jpg" />
                        <div className="w-full flex flex-col items-center pb-40 py-5 gap-3">
                            {e.sets.map((set, i) => (
                                <div
                                    className={` ${i == selected && e?.id == exercise ? "bg-green-500 text-white" : "bg-stone-200"}    rounded-md h-12 flex items-center justify-between px-5 w-full`}
                                    key={Math.random()}>
                                    <span className="leading-8 text-center h-8 w-8 rounded-full bg-white text-black">{i + 1}</span>
                                    <span className="flex gap-2">
                                        <p>{set}</p>
                                        <span>reps</span>
                                    </span>
                                    <button
                                        onClick={() => {
                                            if (exercises[exercise].sets.length > selected + 1) {
                                                setSelected((prev) => prev + 1);
                                            } else {
                                                setExercise((prev) => prev + 1);
                                                setSelected(0);
                                                scrollLeft();
                                            }
                                        }}
                                        className="bg-green-500 text-white absolute right-5 px-8 py-3 rounded-md bottom-8 ">
                                        Next
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}
