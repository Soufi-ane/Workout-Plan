import { useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { RxLapTimer } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Empty from "../components/Empty";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercise, updateLocalStorage } from "../state/plansSlice";
import { formatTime } from "../helpers/helpers";
import InputModal from "../components/InputModal";

export default function Day() {
    const { PLAN, DAY } = useParams();
    const exercises = useSelector((state) => state.plans[PLAN].days[DAY].exercises);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

    const [image, setImage] = useState("");
    const [sets, setSets] = useState([]);
    const [minutes, setMinutes] = useState(0);
    const [secondes, setSecondes] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <p className="pt-12 pb-5 text-center">Exercises</p>
            <div className="flex items-center overflow-y-auto h-[75dvh] flex-col gap-5 pb-16">
                {isOpen && (
                    <InputModal
                        sets={sets}
                        name={name}
                        setName={setName}
                        setIsOpen={setIsOpen}
                        image={image}
                        setImage={setImage}
                        setSets={setSets}
                        minutes={minutes}
                        secondes={secondes}
                        setMinutes={setMinutes}
                        setSecondes={setSecondes}
                    />
                )}

                {exercises?.length ? (
                    exercises.map((e, i) => (
                        <div className="bg-stone-200 rounded-lg flex-col  flex items-center pb-5 pt-3 w-10/12" key={Math.random()}>
                            <div className="flex gap-16 justify-between  w-11/12  ">
                                <p></p>
                                <p className="h-9 ">{e.exercise}</p>
                                <MdDeleteForever
                                    onClick={() => {
                                        dispatch(
                                            deleteExercise({
                                                plan: PLAN,
                                                day: DAY,
                                                id: e.id,
                                            })
                                        );
                                        dispatch(updateLocalStorage("Deleted"));
                                    }}
                                    color="#e92d2d"
                                    size={25}
                                />
                            </div>

                            <div className="flex p-2  items-center rounded-md bg-white w-11/12 ">
                                <img className="h-20 bg-stone-200 rounded-md w-20" src={e.image || "/Workout-Plan/assets/gym.png"} />
                                <div className="flex  flex-col">
                                    {e?.sets?.length <= 5 ? (
                                        e.sets.map((set) => (
                                            <div className="flex items-center ml-10" key={Math.random()}>
                                                <FaTimes size={10} />
                                                <p> {set}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col ml-3 w-full items-center text-xs ">
                                            <span>More Than</span> <FaTimes size={10} />
                                            <span>5 Sets</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-1 flex pl-5 gap-1 flex-col justify-center items-center ml-4">
                                    <RxLapTimer size={20} />
                                    <p>{formatTime(e.time_between)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Empty title="exercise" />
                )}
                {exercises.length ? (
                    <FaPlay
                        onClick={() => {
                            navigate("play");
                        }}
                        size={40}
                        className="absolute bottom-7 z-0"
                    />
                ) : null}
                <IoIosAddCircle
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    size={70}
                    color="#22C55E"
                    className="rounded-lg text-2xl  absolute bottom-3 right-3"
                />
            </div>
        </div>
    );
}
