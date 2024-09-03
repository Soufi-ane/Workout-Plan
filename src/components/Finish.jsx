import { GoGoal } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../helpers/helpers";
import { BiSolidTimer } from "react-icons/bi";
import { RxDotsHorizontal } from "react-icons/rx";

export default function Finish({ es }) {
    const navigate = useNavigate();
    return (
        <div className="w-full h[90dvh] flex flex-col py-10 items-center">
            <div className="flex items-center gap-2 h-20">
                <p className="text-xl">Exercise Finished</p>
                <GoGoal size={28} color="#00D16F" />
            </div>
            <div className="w-11/12 h-[59dvh] overflow-y-auto text-sm flex flex-col items-center gap-2">
                {es.map((e) => (
                    <div className="bg-stone-200 rounded-lg w-11/12 pt-2 px-2 pb-3" key={Math.random()}>
                        <p className="text-center"> {e.exercise}</p>
                        <div className="flex items-center gap-5 px-1">
                            <img className="w-14 h-14 bg-white rounded-md" src={e.image || "/Workout-Plan/assets/gym.png"} />
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
                    navigate("/Workout-Plan/");
                }}
                className="rounded-md px-8 py-2.5 absolute bottom-20 bg-green-500 text-white">
                Done
            </button>
        </div>
    );
}
