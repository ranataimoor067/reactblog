import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "50px",
                        right: "50px",
                        background: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        padding: "10px 15px",
                        cursor: "pointer",
                        fontSize: "18px",
                    }}
                >
                    ↑
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
