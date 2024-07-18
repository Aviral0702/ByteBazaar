import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedText from "../preloader/AnimatedText";
import ImageColumn from "../preloader/ImageColumn";
import ImageColumnContainer from "../preloader/ImageColumnContainer";
import ImageColumnInverse from "../preloader/ImageColumnInverse";

const picsContainer = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
];

const ImageIntro = ({ completed, setCompleted }) => {
  const [clicked, setClicked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadedImages === 20) {
      setTimeout(() => {
        setLoaded(true);
      }, 1750);
    }
  }, [loadedImages]);

  useEffect(() => {
    console.log("hello");
    if (clicked && animationComplete) {
      navigate('/landingpage');
    }
  }, [clicked, animationComplete]);

  return (
    <div
      onClick={() => setClicked(true)}
      className={`absolute top-0 left-0 h-screen w-screen flex justify-around items-center bg-gray-200 z-50 overflow-hidden ${
        completed ? "pointer-events-none opacity-0" : ""
      }`}
    >
      {!loaded && (
        <div className="text-4xl text-black absolute z-[300]">
          {Math.floor((loadedImages / 20) * 100)}%
        </div>
      )}
      <ImageColumnContainer clicked={clicked} loaded={loaded}>
        <ImageColumnInverse
          clicked={clicked}
          pics={picsContainer.slice(0, 4)}
          setLoadedImages={setLoadedImages}
          loaded={loaded}
        />
        <ImageColumn
          clicked={clicked}
          pics={picsContainer.slice(4, 8)}
          setLoadedImages={setLoadedImages}
          loaded={loaded}
        />
        <ImageColumnInverse
          clicked={clicked}
          pics={picsContainer.slice(8, 12)}
          setLoadedImages={setLoadedImages}
          loaded={loaded}
        />
        <ImageColumn
          clicked={clicked}
          pics={picsContainer.slice(12, 16)}
          setLoadedImages={setLoadedImages}
          loaded={loaded}
        />
        <ImageColumnInverse
          clicked={clicked}
          pics={picsContainer.slice(16, 20)}
          setLoadedImages={setLoadedImages}
          loaded={loaded}
        />
      </ImageColumnContainer>
      <AnimatedText
        clicked={clicked}
        setCompleted={setAnimationComplete}
        loaded={loaded}
      />
    </div>
  );
};

export default ImageIntro;
