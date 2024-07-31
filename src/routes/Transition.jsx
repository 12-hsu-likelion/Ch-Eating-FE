import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { motion } from "framer-motion";

const Transition = (Page) => {
    return () => (
        <>
            <Page />
            <StyledPageIn>
                {Array.from({ length: 64 }).map((_, i) => {
                    return <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 0 }}
                        exit={{ scaleY: 1 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * Math.random() * 0.005

                        }}
                        className='box'>

                    </motion.div>
                })}
            </StyledPageIn>

            <StyledPageOut>
                {Array.from({ length: 64 }).map((_, i) => {
                    return <motion.div
                        key={i}
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        exit={{ scaleY: 0 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * Math.random() * 0.005

                        }}
                        className='box'>

                    </motion.div>
                })}
            </StyledPageOut>
        </>
    );
};

const StyledPageIn = styled.div`
    display: grid;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    grid-template-columns: repeat(8, 1fr);
    pointer-events: none;
    z-index: 99999999999999999999999999999999999;

    .box{
        background-color: ${colors.mainColor};
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        transform-origin: bottom;
    }
`;

const StyledPageOut = styled.div`
    display: grid;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    grid-template-columns: repeat(8, 1fr);
    pointer-events: none;
    z-index: 99999999999999999999999999999999999;

    .box{
        background-color: ${colors.mainColor};
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        transform-origin: top;
    }
`;

export default Transition;