import { IoIosAddCircle } from "react-icons/io";

export default function Empty({ title }) {
    return (
        <div className="py-44 text-stone-500 text-sm items-center flex flex-col ">
            <p className="">No {title}s were found</p>
            <span className="flex items-center gap-1">
                <span>Press the </span>
                <IoIosAddCircle size={18} />
                <span>button to add a new {title}</span>
            </span>
        </div>
    );
}
