import { useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { RxLapTimer } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { TiMinus, TiPlus } from "react-icons/ti";

import { MdDeleteForever } from "react-icons/md";
import Modal from "../components/Modal";

import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addExercise, deleteExercise, updateLocalStorage } from "../state/plansSlice";
import { formatTime } from "../helpers/helpers";
import toast from "react-hot-toast";

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
    const uploadRef = useRef(null);
    const repsRef = useRef(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage((prev) => reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex items-center overflow-y-auto h-[88dvh] flex-col gap-5 py-16">
            {isOpen && (
                <Modal
                    onClose={() => {
                        setName("");
                        setIsOpen(false);
                        setImage("");
                        setSets([]);
                    }}
                    onConfirm={() => {
                        if (name == "") {
                            toast.dismiss();
                            return toast.error("Please provide a name");
                        }
                        if (sets.length == 0) {
                            toast.dismiss();
                            return toast.error("You need at least one set");
                        }
                        dispatch(
                            addExercise({
                                plan: PLAN,
                                day: DAY,
                                exercise: name,
                                sets,
                                time_between: Number(minutes * 60) + secondes,
                                image,
                            })
                        );
                        dispatch(updateLocalStorage());

                        setIsOpen(false);
                        setName("");
                        setSets([]);
                        setImage("");
                    }}>
                    <div className="flex flex-col gap-3 pb-3 justify-center">
                        <label>Name: </label>
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            maxLength={20}
                            className="bg-stone-100 rounded-md py-2 px-3 w-full"
                            type="text"
                            placeholder="Squats"
                        />
                        <div className="flex items-center justify-between gap-3">
                            <img className="w-20 bg-stone-200 rounded-md h-20" src={image || "/Workout-Plan/assets/gym.png"} />

                            <div>
                                <div className="bg-stone-200 rounded-md flex justify-center w-48 px-16 py-4" onClick={() => uploadRef.current.click()}>
                                    {" "}
                                    <MdOutlineFileUpload color="gray" size={40} className=" p-1 bg-white w-28 h-11 flex-shrink-0 rounded-md" />
                                </div>

                                <input ref={uploadRef} className="hidden" onChange={(e) => handleImage(e)} type="file" accept=".jpeg, .jpg, .png" />
                            </div>
                        </div>

                        <div ref={repsRef} className={`flex overflow-y-auto ${sets.length > 0 && "pb-8"}  max-h-32 flex-col gap-2 items-center justify-center`}>
                            {sets.map((set, index) => (
                                <div className="flex bg-stone-200 w-full rounded-md flex-shrink-0 py-1.5 justify-around items-center " key={Math.random()}>
                                    <span className="leading-8 text-center h-8 w-8 rounded-full bg-white text-black">{index + 1}</span>
                                    <span className="flex items-center gap-2">
                                        <TiMinus
                                            onClick={() => {
                                                const newSets = sets.map((s, i) => (i == index ? (s > 1 ? s - 1 : 1) : s));
                                                setSets((prev) => newSets);
                                            }}
                                            size={25}
                                            className="bg-red-500 text-white rounded-md p-1 w-10 h-8 "
                                        />
                                        <p className="w-12 bg-white rounded-md py-1 text-center">{sets[index]}</p>
                                        <TiPlus
                                            onClick={() => {
                                                const newSets = sets.map((s, i) => (i == index ? (s < 99 ? s + 1 : 99) : s));
                                                setSets((prev) => newSets);
                                            }}
                                            size={25}
                                            className="bg-green-500 text-white rounded-md p-1 w-10 h-8 "
                                        />
                                        <span>reps</span>
                                    </span>
                                    <MdDeleteForever
                                        onClick={() => {
                                            setSets((curr) => curr.filter((SET, I) => I !== index));
                                        }}
                                        color="#e92d2d"
                                        size={20}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                setSets((curr) => [...curr, 1]);
                                repsRef.current.scrollBy({
                                    top: 1000,
                                    behavior: "smooth",
                                });
                            }}
                            className="bg-green-500 py-2 px-10 rounded-md text-white">
                            Add a set +
                        </button>

                        <p className="text-center">Time between sets</p>

                        <div className="flex justify-center gap-1 items-center ">
                            <input
                                value={minutes}
                                onChange={(e) => {
                                    setMinutes((p) => (e.target.value < 60 ? e.target.value : 59));
                                }}
                                className="w-11  bg-stone-200 rounded-md pl-3"
                                placeholder="0"
                                type="number"
                            />
                            <p>Min</p>

                            <input
                                value={secondes}
                                onChange={(e) => {
                                    setSecondes((prv) => (e.target.value < 60 ? e.target.value : 59));
                                }}
                                className="w-11 bg-stone-200 rounded-md pl-3"
                                placeholder="0"
                                type="number"
                            />
                            <p>Sec</p>
                        </div>
                    </div>
                </Modal>
            )}
            {exercises &&
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
                                    console.log("id", i);
                                    dispatch(updateLocalStorage());
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
                ))}
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
    );
}
