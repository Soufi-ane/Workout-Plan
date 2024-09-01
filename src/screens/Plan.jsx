import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";

import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addDay, updateLocalStorage } from "../state/plansSlice";
import toast from "react-hot-toast";

export default function Plan() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const { PLAN } = useParams();
    const days = useSelector((state) => state.plans[PLAN].days);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <div className="flex flex-col h-[99dvh] pb-5 gap-5 items-center justify-center ">
            {isOpen && (
                <Modal
                    onClose={() => {
                        setName("");
                        setIsOpen(false);
                    }}
                    onConfirm={() => {
                        if (name == "") {
                            toast.dismiss();
                            return toast.error("Please provide a name");
                        }
                        dispatch(
                            addDay({
                                plan: PLAN,
                                day: name,
                            })
                        );
                        dispatch(updateLocalStorage());
                        setIsOpen(false);
                        setName("");
                    }}>
                    <div className="flex flex-col gap-3 pb-10 justify-center">
                        <label>Name: </label>
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            maxLength={20}
                            className="bg-stone-100 rounded-md py-2 px-3 w-full"
                            type="text"
                            placeholder="Push day"
                        />
                    </div>
                </Modal>
            )}
            <div className="overflow-y-auto flex flex-col items-center gap-5 w-full h-[80dvh]">
                {days &&
                    days.map((day) => {
                        return (
                            <div
                                onClick={() => {
                                    navigate(`${day.id}`);
                                }}
                                className="bg-stone-300 flex items-center justify-center flex-shrink-0 rounded-lg h-60 w-10/12"
                                key={Math.random()}>
                                {day.day}
                            </div>
                        );
                    })}
            </div>

            <IoIosAddCircle
                onClick={() => {
                    setIsOpen(true);
                }}
                size={70}
                color="#22C55E"
                className="rounded-lg  absolute bottom-3 right-3"
            />
        </div>
    );
}
