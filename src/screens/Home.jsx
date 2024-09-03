import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoIosAddCircle } from "react-icons/io";

import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addPlan, deletePlan, updateLocalStorage } from "../state/plansSlice";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import Empty from "../components/Empty";

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
                            dispatch(updateLocalStorage("Added"));
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
            <p className="pt-16 text-center">Plans</p>

            <div className="flex items-center h-[80dvh] overflow-y-auto flex-col gap-3 pb-20 mt-4 ">
                {plans?.length ? (
                    plans?.map((plan) => (
                        <div key={Math.random()} className="bg-stone-200 flex-shrink-0 flex flex-col relative  w-11/12 justify-center items-center  rounded-xl">
                            <p
                                onClick={() => {
                                    navigate(`${plan.id}`);
                                }}
                                className="pb-24 pt-12 w-full text-center mt-12">
                                {plan.plan}
                            </p>
                            <MdDeleteForever
                                onClick={() => {
                                    dispatch(deletePlan(plan.id));
                                    dispatch(updateLocalStorage("Deleted"));
                                }}
                                color="#e92d2d"
                                size={30}
                                className=" bg-white rounded-full p-1 absolute top-2 right-2"
                            />
                        </div>
                    ))
                ) : (
                    <>
                        <Empty title="plan" />
                        <p className="text-stone-500 text-sm">All data is stored in the local storage !!!</p>
                    </>
                )}

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
