import { useState, useEffect, useRef } from "react";

const CountDown = (props) => {
    const { isSubmitted } = props;
    const [count, setCount] = useState(300);
    const timerRef = useRef(null);

    const toMMSS = (totalSeconds) => {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 0) {
                    props.onTimeUp(); // Call the onTimeUp function when time is up
                    clearInterval(timerRef.current);
                    return 0; // Stop the countdown at 0
                }
                return prevCount - 1;
            });
        }, 1000); // Decrease count every second

        return () => clearInterval(timerRef.current); // Cleanup on component unmount
    }, []);

    // Effect to stop the timer when the quiz is submitted
    useEffect(() => {
        if (isSubmitted && timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, [isSubmitted]);

    return <div className="countdown-container">{toMMSS(count)}</div>;
};

export default CountDown;
