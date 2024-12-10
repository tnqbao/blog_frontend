import React, { useEffect, useState } from "react";
import {ArrowUpOutlined} from "@ant-design/icons";

const ScrollToTopButton: React.FC = () => {
    const [showScrollTopButton, setShowScrollTopButton] = useState<boolean>(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollTopButton(true);
        } else {
            setShowScrollTopButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!showScrollTopButton) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 text-black rounded-full shadow-lg transition text-3xl"
            aria-label="Scroll to top"
        >
            <ArrowUpOutlined />
        </button>
    );
};

export default ScrollToTopButton;
