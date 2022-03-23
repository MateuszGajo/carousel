import logo from "./logo.svg";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import App1 from "./App1";

const elements = 3;
const sliderElements = elements + 4;

function App() {
  const [position, setPosition] = useState([]);
  const [width, setWidth] = useState(0);
  const [elementWidth, setElementWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [visibleCard, setVisibleCards] = useState(
    Array.from(Array(elements + 1).keys())
  );
  console.log(visibleCard);
  const container = useRef();
  const isPageTransition = useRef(false);

  const onRightClick = () => {
    if (isPageTransition.current) return;
    isPageTransition.current = true;
    setTimeout(() => {
      isPageTransition.current = false;
    }, 400);
    const newArr = position.map((item) => {
      let newPosition = item - elementWidth;
      if (newPosition < -3 * elementWidth)
        newPosition = elementWidth * elements;
      return newPosition;
    });
    let newIndex = index + 1;
    if (newIndex >= sliderElements) {
      newIndex = 0;
    }
    console.log("index");
    console.log(index);
    setIndex(newIndex);
    const visibleCards = [];
    let tempIndex = newIndex;
    for (let i = 0; i < elements; i++) {
      visibleCards.push(tempIndex);
      tempIndex += 1;
      if (tempIndex >= sliderElements) tempIndex = 0;
    }
    setVisibleCards(visibleCards);
    setPosition(newArr);
  };

  const onLeftClick = () => {
    if (isPageTransition.current) return;
    isPageTransition.current = true;
    setTimeout(() => {
      isPageTransition.current = false;
    }, 400);
    const newArr = position.map((item) => {
      let newPosition = item + elementWidth;
      if (newPosition > 3 * elementWidth)
        newPosition = -elementWidth * elements;
      return newPosition;
    });
    let newIndex = index - 1;
    if (newIndex < 0) {
      newIndex = sliderElements - 1;
    }
    setIndex(newIndex);
    const visibleCards = [];
    let tempIndex = newIndex;
    for (let i = 0; i < elements + 1; i++) {
      visibleCards.push(tempIndex);
      tempIndex -= 1;
      if (tempIndex < 0) tempIndex = sliderElements - 1;
    }
    setVisibleCards(visibleCards);
    console.log(visibleCard);
    setPosition(newArr);
  };

  useEffect(() => {
    if (container.current) {
      const width = container.current.offsetWidth;
      setWidth(width);
    }
  }, []);

  useEffect(() => {
    if (width === 0) return;
    const elementWidth = width / elements;
    setElementWidth(elementWidth);
    const positionArr = [];
    for (let i = 0; i < sliderElements - 2; i++) {
      positionArr.push(i * elementWidth);
    }
    positionArr.push(-2 * elementWidth);
    positionArr.push(-1 * elementWidth);

    setPosition(positionArr);
  }, [width]);

  return (
    <div className="App">
      <div className="carousel" ref={container}>
        {Array.from(Array(sliderElements).keys()).map((item, index) => {
          return (
            <div
              className={`box box${index}`}
              style={{
                width: elementWidth,
                transform: `translateX(${position[index]}px)`,
                opacity: visibleCard.includes(index) ? 1 : 0,
              }}
            >
              {index}
            </div>
          );
        })}
      </div>
      <div onClick={onRightClick}>right arrow</div>
      <div onClick={onLeftClick}>left arrow</div>
    </div>
  );
}

export default App;
