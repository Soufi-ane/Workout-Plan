import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import Modal from "../components/Modal";

function Home() {
    const { plans, setPlans } = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("plans", JSON.stringify(plans));
    }, [plans]);
    return (
        <>
            {isOpen && (
                <Modal
                    onConfirm={() => {
                        if (name == "") return;
                        else {
                            setPlans((prev) => [
                                ...prev,
                                {
                                    id: prev.length,
                                    plan: name,
                                    description: desc,
                                    days: [],
                                },
                            ]);

                            setIsOpen(false);
                            setName("");
                            setDesc("");
                        }
                    }}
                    onClose={() => {
                        setName("");
                        setDesc("");
                        setIsOpen(false);
                    }}>
                    <div className="flex flex-col gap-1 pb-5 justify-center">
                        <label>Name: </label>
                        <input maxLength={20} value={name} onChange={(e) => setName(e.target.value)} className="bg-stone-100 rounded-md py-2 px-3 w-full" type="text" placeholder="My New Plan" />
                        <label>Description: </label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            maxLength={70}
                            className="bg-stone-100 rounded-md py-2 px-3 h-40 w-full"
                            placeholder="Describe your new plan ..."
                        />
                    </div>
                </Modal>
            )}
            <div className="flex items-center h-[95dvh] overflow-y-auto flex-col gap-3 py-20">
                {plans.length &&
                    plans?.map((plan) => (
                        <div
                            onClick={() => {
                                navigate(`${plan.id}`);
                            }}
                            className="bg-stone-200 flex-shrink-0 flex flex-col h-60 w-11/12 justify-center items-center  rounded-xl"
                            key={plan.plan}>
                            {plan.plan}
                        </div>
                    ))}
                <TbSquareRoundedPlusFilled
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    size={70}
                    color="#22C55E"
                    className="rounded-lg text-2xl  absolute bottom-10 right-5"
                />
            </div>
        </>
    );
}

export default Home;
