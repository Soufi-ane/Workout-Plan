import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { GoGoal } from "react-icons/go";
import { TiPlus } from "react-icons/ti";
import { RxDotsHorizontal } from "react-icons/rx";
import { BiSolidTimer } from "react-icons/bi";
const start = Math.floor(Date.now() / 1000);
const formatTime = (t) => {
    let minutes = Math.floor(t / 60);
    let secondes = t % 60;
    if (minutes < 10) minutes = `0${minutes}`;
    if (secondes < 10) secondes = `0${secondes}`;
    return `${minutes}:${secondes}`;
};
export default function Play() {
    const { plans, setPlans } = useContext(DataContext);
    const { PLAN, DAY } = useParams();
    const [selected, setSelected] = useState(0);
    const [exercises, setExercises] = useState(plans[PLAN]?.days[DAY]?.exercises);
    // const [totalTime, setTotalTime] = useState(0);
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
            {isFinished && <Finish T={Math.floor(Date.now() / 1000) - start} es={exercises} />}
            {exercises &&
                !isFinished &&
                exercises.map((e) => (
                    <div key={Math.random()} className="flex 0 flex-col items-center pt-10 w-full flex-shrink-0  ">
                        <Counter current={selected} betweenTime={exercises[exercise].time_between} />
                        <p>{totalTime}</p>

                        <p className="text-xl capitalize mb-5">{e.exercise}</p>
                        <img className=" w-[60vw] h-[60vw] bg-stone-200 rounded-lg" src="/Workout-Plan/assets/pushup.jpg" />
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

const Counter = ({ current, betweenTime }) => {
    const [time, setTime] = useState(0);
    const [timeIsUp, setTimeIsUp] = useState(false);
    const [played, setPlayed] = useState(false);

    useEffect(() => {
        let interval;
        if (current == 0) {
            interval = setInterval(() => {
                setTime((prev) => (prev < 3599 ? prev + 1 : 0));
            }, 1000);
        } else {
            setTime(betweenTime);
            interval = setInterval(() => {
                setTime((prev) => {
                    if (prev > 1) return prev - 1;
                    else {
                        setTimeIsUp((whatever) => true);

                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, []);
    return <div className={`text-sm ${timeIsUp ? "text-red-600" : ""}`}>{formatTime(time)}</div>;
};

const Finish = ({ T, es }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full h[90dvh] flex flex-col py-10 items-center">
            <div className="flex items-center gap-2 h-20">
                <p className="text-xl">Exercise Finished</p>
                <GoGoal size={28} color="#00D16F" />
            </div>
            <div className="pb-8 text-sm">
                <span className=" flex items-center gap-1">
                    <p>Total Time :</p>
                    <p>{formatTime(T)}</p>
                    <BiSolidTimer size={23} color="#616161" />
                </span>
            </div>
            <div className="w-11/12 h-[50dvh] overflow-y-auto text-sm flex flex-col items-center gap-2">
                {es.map((e) => (
                    <div className="bg-stone-200 rounded-lg w-11/12 pt-2 px-2 pb-4" key={Math.random()}>
                        <p className="text-center"> {e.exercise}</p>
                        <div className="flex items-center gap-5 px-1">
                            <img className="w-10 h-10 bg-white rounded-md" src="/Workout-Plan/assets/gym.png" />
                            <div className="flex gap-2">
                                <span>{`${e.sets.length} Sets : `}</span>
                                <div className="flex items-center gap-0.5">
                                    {e.sets.map((s, i) => (
                                        <div className="flex gap-1 items-center" key={Math.random()}>
                                            {i !== 0 && i < 3 && <span>-</span>}

                                            {i < 3 ? <span>{s}</span> : null}
                                        </div>
                                    ))}{" "}
                                    {e.sets.length > 3 && <RxDotsHorizontal size={17} />}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => {
                    navigate("/Workout-Plan");
                }}
                className="rounded-md px-8 py-2.5 absolute bottom-20 bg-green-500 text-white">
                Done
            </button>
        </div>
    );
};
