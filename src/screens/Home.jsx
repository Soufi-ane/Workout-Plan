import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { IoIosAddCircle } from "react-icons/io";

import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addPlan, updateLocalStorage } from "../state/plansSlice";
import toast from "react-hot-toast";

function Home() {
    const plans = useSelector((state) => state.plans);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            {isOpen && (
                <Modal
                    onConfirm={() => {
                        if (name == "") {
                            toast.dismiss();
                            return toast.error("Please provide a name");
                        } else {
                            dispatch(addPlan(name));
                            dispatch(updateLocalStorage());
                            setIsOpen(false);
                            setName("");
                        }
                    }}
                    onClose={() => {
                        setName("");
                        setIsOpen(false);
                    }}>
                    <div className="flex flex-col gap-1 pb-5 justify-center">
                        <label>Name: </label>
                        <input maxLength={20} value={name} onChange={(e) => setName(e.target.value)} className="bg-stone-100 rounded-md py-2 px-3 w-full" type="text" placeholder="My New Plan" />
                    </div>
                </Modal>
            )}
            <div className="flex items-center h-[88dvh] overflow-y-auto flex-col gap-3 py-20">
                {plans.length &&
                    plans?.map((plan) => (
                        <div
                            key={Math.random()}
                            onClick={() => {
                                navigate(`${plan.id}`);
                            }}
                            className="bg-stone-200 flex-shrink-0 flex flex-col h-60 w-11/12 justify-center items-center  rounded-xl">
                            {plan.plan}
                        </div>
                    ))}

                <IoIosAddCircle
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    size={70}
                    color="#22C55E"
                    className="rounded-full  absolute bottom-3 right-3"
                />
            </div>
        </>
    );
}

export default Home;
