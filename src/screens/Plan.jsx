import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";

export default function Plan() {
    const { plans, setPlans } = useContext(DataContext);
    const [days, setDays] = useState([]);
    const { PLAN } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let d = [];
        plans[PLAN]?.days?.map((day) => {
            d.push(day);
        });
        setDays([...d]);
    }, [plans, PLAN]);

    return (
        <div className="flex flex-col py-10 gap-5 items-center justify-center ">
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
        </div>
    );
}
