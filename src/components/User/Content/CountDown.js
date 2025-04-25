import { useState, useEffect } from "react";

const CountDown = (props) => {
    const [count, setCount] = useState(300);

    const toMMSS = (totalSeconds) => {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 0) {
                    props.onTimeUp(); // Call the onTimeUp function when time is up
                    clearInterval(timer);
                    return 0; // Stop the countdown at 0
                }
                return prevCount - 1;
            });
        }, 1000); // Decrease count every second

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    return <div className="countdown-container">{toMMSS(count)}</div>;
};

export default CountDown;
