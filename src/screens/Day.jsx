import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { RxLapTimer } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import Modal from "../components/Modal";
const formatTime = (t) => {
    let minutes = Math.floor(t / 60);
    let secondes = t % 60;
    if (minutes < 10) minutes = `0${minutes}`;
    if (secondes < 10) secondes = `0${secondes}`;
    return `${minutes}:${secondes}`;
};
import { MdOutlineFileUpload } from "react-icons/md";

export default function Day() {
    const { plans, setPlans } = useContext(DataContext);

    const { PLAN, DAY } = useParams();
    // console.log(plans[PLAN].days[DAY].exercises);
    const [exercises, setExercises] = useState(plans[PLAN]?.days[DAY]?.exercises);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [sets, setSets] = useState([]);
    const [between, setBetween] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [secondes, setSecondes] = useState(0);
    const navigate = useNavigate();

    const uploadRef = useRef(null);
    const repsRef = useRef(null);
    useEffect(() => {
        localStorage.setItem("plans", JSON.stringify(plans));
        setExercises(plans[PLAN]?.days[DAY]?.exercises);
        // console.log(plans[PLAN].days[DAY].exercises);
    }, [plans]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage((prev) => reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex items-center flex-col gap-5 py-10">
            {isOpen && (
                <Modal
                    onClose={() => {
                        setName("");
                        setDesc("");
                        setIsOpen(false);
                        setImage("");
                        setSets([]);
                    }}
                    onConfirm={() => {
                        setPlans((prev) =>
                            prev.map((p) => {
                                if (p?.id == PLAN)
                                    return {
                                        ...p,
                                        days: p.days.map((d) => {
                                            if (d?.id == DAY)
                                                return {
                                                    ...d,
                                                    exercises: [
                                                        ...d.exercises,
                                                        {
                                                            id: d.exercises.length,
                                                            exercise: name,
                                                            sets,
                                                            time_between: Number(minutes * 60) + secondes,
                                                            image,
                                                        },
                                                    ],
                                                };
                                        }),
                                    };
                            })
                        );
                        console.log(plans);

                        setIsOpen(false);
                        setName("");
                        setDesc("");
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
                        <label>Description: </label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            maxLength={40}
                            className="bg-stone-100 resize-none rounded-md py-2 px-3 h-10 w-full"
                            placeholder="Describe your exercise ..."
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
                                <div className="flex bg-stone-200 w-11/12 rounded-md flex-shrink-0 py-1.5 justify-around items-center " key={Math.random()}>
                                    <span className="leading-8 text-center h-8 w-8 rounded-full bg-white text-black">{index + 1}</span>
                                    <span className="flex items-center gap-2">
                                        <input
                                            onChange={(e) => {
                                                setSets((curr) => curr.map((s, i) => (i == index ? Number(e.target.value) : s)));
                                            }}
                                            value={sets[index]}
                                            className="w-12 rounded-md py-1 pl-4"
                                            placeholder="0"
                                            type="number"
                                        />
                                        <span>reps</span>
                                    </span>{" "}
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
                                setSets((curr) => [...curr, ""]);
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
                exercises.map((e) => (
                    <div className="bg-stone-200 rounded-lg flex-col  flex items-center pb-5 pt-3 w-10/12" key={Math.random()}>
                        <p className="h-9 text-center">{e.exercise}</p>
                        <div className="flex p-2 gap-10 items-center rounded-md bg-white w-11/12 ">
                            <img className="h-20 bg-stone-200 rounded-md w-20" src={e.image || "/Workout-Plan/assets/gym.png"} />
                            <div className="flex flex-col">
                                {e.sets.length <= 5 ? (
                                    e.sets.map((set) => (
                                        <div className="flex items-center" key={Math.random()}>
                                            <FaTimes size={10} />
                                            <p> {set}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center">
                                        <FaTimes className=" rotate-45" size={15} /> <p>5+</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-1 flex gap-1 flex-col justify-center items-center ml-4">
                                <RxLapTimer size={20} />
                                <p>{formatTime(e.time_between)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            <FaPlay
                onClick={() => {
                    navigate("play");
                }}
                size={40}
                className="absolute bottom-10 z-0"
            />
            <TbSquareRoundedPlusFilled
                onClick={() => {
                    setIsOpen(true);
                }}
                size={70}
                color="#22C55E"
                className="rounded-lg text-2xl  absolute bottom-10 right-5"
            />
        </div>
    );
}

const CreateExercise = () => {
    const [image, setImage] = useState(null);
    const handleImage = (event) => {
        setImage((curr) => event.target.files[0]);
    };
    return (
        <div className="w-full h-[100dvh] font-bold flex items-center justify-center">
            <div>
                <form>
                    <button>Upload</button>
                </form>
            </div>
        </div>
    );
};
