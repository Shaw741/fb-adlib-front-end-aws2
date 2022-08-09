import { Avatar } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const BackTotopbutton = () => {
    const [backtoTop, setbacktoTop] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 100) {
                setbacktoTop(true);
            } else {
                setbacktoTop(false);
            }
        });
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <>
            {
                backtoTop && (
                    <Avatar
                        style={{
                            position: "fixed",
                            bottom: "50px",
                            right: "50px",
                            height: "50px",
                            width: "50px",
                            zIndex: 1,
                            cursor: "pointer",
                            background: 'linear-gradient(243.18deg, #B5EDFF 0%, #00CBFF 28.65%, #6721FF 85.94%)',
                        }}
                        onClick={scrollToTop}
                    >
                        <ArrowDropUpIcon fontSize='large' />
                    </Avatar>
                )
            }
        </>
    )
}

export default BackTotopbutton