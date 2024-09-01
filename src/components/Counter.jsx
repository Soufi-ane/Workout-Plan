import { useEffect, useState } from "react";
import { formatTime } from "../helpers/helpers";

export default function Counter({ current, betweenTime }) {
    const [time, setTime] = useState(0);
    const [timeIsUp, setTimeIsUp] = useState(false);
    const [played, setPlayed] = useState(false);

    useEffect(() => {
        let interval;
        if (current == 0) {
            interval = setInterval(() => {
                setTime((prev) => (prev < 3599 ? prev + 1 : 0));
            }, 1000);
        } else {
            setTime(betweenTime);
            interval = setInterval(() => {
                setTime((prev) => {
                    if (prev > 1) return prev - 1;
                    else {
                        setTimeIsUp((whatever) => true);

                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, []);
    return <div className={`text-sm ${timeIsUp ? "text-red-600" : ""}`}>{formatTime(time)}</div>;
}
