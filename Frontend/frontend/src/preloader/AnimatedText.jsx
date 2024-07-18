"use client";

import { motion, AnimatePresence } from "framer-motion";

const AnimatedText = ({ clicked, setCompleted, loaded }) => {
  const abhivyakti = Array.from("ByteBazaar");

  const textVariant = {
    exit: {
      scale: [1, 0.75, 200],
      x: ["0%", "0%", "100%"],
      y: ["0%", "0%", "5000%"],
      transition: {
        delay: 2.5,
        duration: 1,
        ease: [0.5, 0, 0.15, 0.85],
      },
    },
  };

  const animatedTextOne = {
    initial: {
      y: "150%",
      opacity: 0.4,
    },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1.5,
        opacity: {
          delay: 3,
          duration: 1,
        },
        ease: [1, 0.1, 0.25, 1.5],
      },
    },
    exit: {
      y: ["0%", "-50%", "0%"],
      transition: {
        duration: 1,
        ease: [1, 0.1, 0.25, 1.5],
      },
    },
  };

  const animatedTextTwo = {
    initial: {
      y: "-150%",
      opacity: 0.4,
    },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        delay: 1,
        duration: 1.5,
        opacity: {
          delay: 3,
          duration: 1,
        },
        ease: [1, 0.1, 0.25, 1.5],
      },
    },
    exit: {
      y: ["0%", "50%", "0%"],
      transition: {
        duration: 1,
        ease: [1, 0.1, 0.25, 1.5],
      },
    },
  };

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          variants={textVariant}
          exit="exit"
          onAnimationComplete={() => setCompleted(true)}
          className="whitespace-nowrap font-serif ave cursor-pointer z-[100] text-7xl md:text-9xl text-black bg-white p-4 border-4 border-black shadow-xl"
          style={{
            boxShadow: '0 20px 40px rgba(0, 0, 255, 0.25), 0 10px 20px rgba(0, 0, 255, 0.22)', // Blue shadow
          }}
        >
          <div className="overflow-hidden text-black">
            {abhivyakti.map((letter, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? animatedTextOne : animatedTextTwo}
                initial="initial"
                animate={loaded ? "animate" : "initial"}
                exit="exit"
                className="inline-block text-black z-100"
              >
                {letter}
              </motion.div>
            ))}
          </div>

          <div className="overflow-hidden text-end leading-[0] text-black font-serif">
            <motion.div
              variants={animatedTextOne}
              initial="initial"
              animate={loaded ? "animate" : "initial"}
              transition={{ delay: 1 }}
              className="inline-block text-xl font-mono text-black"
            >
              a <span className="font-bold text-3xl text-black"><span className="text-stroke text-black">Code</span>Crew</span><br />Initiative
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedText;
