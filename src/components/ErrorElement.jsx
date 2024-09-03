import { useNavigate } from "react-router-dom";

export default function ErrorElement() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-5 items-center justify-center h-[100dvh] w-full">
            <p className="text-xl">Something went wrong !</p>
            <button
                className="bg-stone-200 rounded-md py-3 px-8"
                onClick={() => {
                    navigate("/Workout-Plan/");
                }}>
                Back Home
            </button>
        </div>
    );
}
