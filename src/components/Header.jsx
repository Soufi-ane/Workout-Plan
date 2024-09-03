import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="flex absolute bg-white justify-between items-center z-40 w-screen px-3 py-2">
            <img
                onClick={() => {
                    navigate("/Workout-Plan");
                }}
                src="/Workout-Plan/assets/gym.png"
                className="w-7 h-7"
            />
            <p className=" leading-8">Workout Plan</p>
            <span className="w-7"></span>
        </div>
    );
};

export default Header;
