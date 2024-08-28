import { useEffect, useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import Home from "./screens/Home";
import Header from "./components/Header";

function App() {
    return (
        <div
            style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontStyle: "normal",
            }}>
            <Header />
            <Home />
        </div>
    );
}

export default App;

const CreateExercise = () => {
    const [image, setImage] = useState(null);
    const handleImage = (event) => {
        setImage((curr) => event.target.files[0]);
    };
    return (
        <div className="w-full h-[100dvh] font-bold flex items-center justify-center">
            <div>
                <div>
                    <img className="w-60 h-60" src={image ? URL.createObjectURL(image) : "/assets/gym.png"} />
                </div>
                <form>
                    <div className="w-60 relative">
                        <MdOutlineInsertPhoto size={60} className=" absolute top-0 left-0 w-20 h-10 bg-green-600" />
                        <input onChange={(e) => handleImage(e)} type="file" accept=".jpeg, .jpg, .png" className="absolute z-20 opacity-0 top-0 left-0 w-20 h-10 bg-red-500" />
                    </div>
                    <button>Upload</button>
                </form>
            </div>
        </div>
    );
};
