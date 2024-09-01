import { useContext, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import Counter from "../components/Counter";
import Finish from "../components/Finish";
const start = Math.floor(Date.now() / 1000);

export default function Play() {
    const { PLAN, DAY } = useParams();
    const exercises = useSelector((state) => state.plans[PLAN].days[DAY].exercises);

    const [selected, setSelected] = useState(0);

    const { totalTime } = useContext(DataContext);
    const [isFinished, setIsFinished] = useState(false);
    const [exercise, setExercise] = useState(0);
    const containerRef = useRef(null);

    const scrollLeft = () => {
        containerRef.current.scrollBy({
            left: window.innerWidth + 5,
            behavior: "smooth",
        });
    };

    return (
        <div ref={containerRef} className="py-2 overflow-y-auto h-[100dvh] px-2 gap-5  overflow-x-hidden whitespace-nowrap flex felx-col">
            {isFinished && <Finish start={start} es={exercises} />}
            {exercises &&
                !isFinished &&
                exercises.map((e) => (
                    <div key={Math.random()} className="flex 0 flex-col items-center pt-10 w-full flex-shrink-0  ">
                        <Counter current={selected} betweenTime={exercises[exercise].time_between} />
                        <p>{totalTime}</p>

                        <p className="text-xl capitalize mb-5">{e.exercise}</p>
                        <img className=" w-[60vw] h-[60vw] rounded-lg" src={e.image || "/Workout-Plan/assets/gym.png"} />
                        <div className="w-full px-3 pb-20 flex flex-col items-center overflow-y-auto mt-3 gap-3">
                            {e.sets.map((set, i) => (
                                <div
                                    className={` ${
                                        i == selected && e?.id == exercise ? "bg-green-500 text-white" : "bg-stone-200"
                                    }    rounded-md h-12 flex-shrink-0  flex items-center justify-between px-5 w-full`}
                                    key={Math.random()}>
                                    <span className="leading-8 text-center h-8 w-8 rounded-full bg-white text-black">{i + 1}</span>
                                    <span className="flex gap-2">
                                        <p>{set}</p>
                                        <span>reps</span>
                                    </span>
                                    <button
                                        onClick={() => {
                                            if (selected + 1 < exercises[exercise].sets.length) {
                                                setSelected((prev) => prev + 1);
                                            } else {
                                                if (exercises.length > exercise + 1) {
                                                    setSelected(0);
                                                    setExercise((e) => e + 1);
                                                    scrollLeft();
                                                } else {
                                                    setIsFinished(true);
                                                }
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
