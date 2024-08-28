import { TbMenuDeep } from "react-icons/tb";
const Header = () => {
    return (
        <div className="flex justify-between items-center w-screen px-3 py-2">
            <img src="/assets/gym.png" className="w-7 h-7" />
            <p className=" leading-8">Workout Plan</p>
            <TbMenuDeep size={30} />
        </div>
    );
};

export default Header;
