import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import Modal from "../components/Modal";

export default function Plan() {
    const { plans, setPlans } = useContext(DataContext);
    const [days, setDays] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const { PLAN } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("plans", JSON.stringify(plans));
    }, [plans]);

    useEffect(() => {
        let d = [];
        plans[PLAN]?.days?.map((day) => {
            d.push(day);
        });
        setDays([...d]);
    }, [plans, PLAN]);

    return (
        <div className="flex flex-col py-10 gap-5 items-center justify-center ">
            {isOpen && (
                <Modal
                    onClose={() => {
                        setName("");
                        setIsOpen(false);
                    }}
                    onConfirm={() => {
                        setPlans((prev) =>
                            prev.map((p) =>
                                p.id == PLAN
                                    ? {
                                          ...p,
                                          days: [
                                              ...p.days,
                                              {
                                                  id: p.days.length,
                                                  day: name,
                                                  exercises: [],
                                              },
                                          ],
                                      }
                                    : p
                            )
                        );

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
            {days &&
                days.map((day) => {
                    return (
                        <div
                            onClick={() => {
                                navigate(`${day.id}`);
                            }}
                            className="bg-stone-300 flex items-center justify-center rounded-lg h-60 w-10/12"
                            key={Math.random()}>
                            {day.day}
                        </div>
                    );
                })}
            <TbSquareRoundedPlusFilled
                onClick={() => {
                    setIsOpen(true);
                }}
                size={70}
                color="#22C55E"
                className="rounded-lg  absolute bottom-10 right-5"
            />
        </div>
    );
}
