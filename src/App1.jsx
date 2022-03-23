import React from "react";
import { useEffect, useState } from "react";
import Slider from "infinite-react-carousel";
const App1 = () => {
  return (
    <div style={{ width: "40%" }}>
      <Slider slideToShow={3} dots>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
      </Slider>
    </div>
  );
};

export default App1;
