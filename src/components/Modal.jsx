export default function Modal({ children, onConfirm, onClose }) {
    return (
        <div className="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex bg-stone-400 backdrop-blur-sm bg-opacity-50 items-center justify-center w-screen h-[100dvh]">
            <div className="bg-white rounded-md py-3 px-5 w-11/12">
                <div>{children}</div>
                <div className="flex items-center justify-between px-3 gap-5">
                    <button onClick={onClose} className="w-36  h-12 px-5 rounded-md bg-stone-100">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="w-56  h-12 rounded-md bg-green-500 text-white">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
