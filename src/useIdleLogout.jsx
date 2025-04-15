import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const IDLE_TIMEOUT = 5 * 1000; //  5 secs 

function useIdleLogout(){
    const navigate = useNavigate();

    useEffect(() => {
        let timer;

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                signOut(auth).then(() => {
                alert("You were inactive. Logged out for security.");
                navigate("/account/signin");
                });
            }, IDLE_TIMEOUT);
        };

        // Events that count as "activity"
        const events = ["mousemove", "keydown", "click", "scroll"];
        events.forEach(event => window.addEventListener(event, resetTimer));

        resetTimer(); // start timer on mount
        return () => {
            clearTimeout(timer);
            events.forEach(event => window.removeEventListener(event, resetTimer));
        };
    }, []);
}

export default useIdleLogout;