import {useEffect, useState} from "react";

export function useTheme() {
    const [theme, setTheme] = useState("dark");
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = (event) => {
        if (theme === "dark") {setTheme("light");}
        else setTheme("dark");
    }
    return {
        theme,
        toggleTheme,
    }
}