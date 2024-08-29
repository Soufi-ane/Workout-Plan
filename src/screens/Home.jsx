import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

function Home() {
    const { plans, setPlans } = useContext(DataContext);
    const navigate = useNavigate();
    return (
        <div className="flex items-center flex-col gap-3 py-10">
            {plans.length &&
                plans?.map((plan) => (
                    <div
                        onClick={() => {
                            navigate(`${plan.id}`);
                        }}
                        className="bg-stone-200 flex flex-col h-60 w-11/12 justify-center items-center  rounded-xl"
                        key={plan.plan}>
                        {plan.plan}
                    </div>
                ))}
        </div>
    );
}

export default Home;
