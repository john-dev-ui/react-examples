import React, { useState } from 'react';

const SlowComponent = ({ noSlowdown }) => {
  const arr = [];
  if (!noSlowdown) {
    for (var i = 1000000 - 1; i >= 0; i--) {
      arr.push(i);
    }
  }
  return (
    <div>
      I am slooooooow
      <span className="re-render">
        {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
      </span>
    </div>
  );
};

const FastComponent1 = () => {
  return (
    <div>
      I am fassssst 1 ....
      <span className="re-render">
        {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
      </span>
    </div>
  );
};

export const StateNoise = () => {
  const [dummy, setDummy] = useState();

  return (
    <>
      <div>Date = {dummy ?? ''}</div>
      <button onClick={() => setDummy(Date.now())}>Render!</button>
    </>
  );
};

const FastComponent2 = () => {
  console.log(`Fast Component 2 render`);
  return (
    <div>I am fassssst 2 .... Randome = {(Math.random() * 100).toFixed()}</div>
  );
};

const FastComponent3 = () => {
  console.log(`Fast Component 3 render`);
  return <div>I am fassssst 3 .... See logs if I am rendered</div>;
};
export default function Solution1() {
  const [dummy, setDummy] = useState();
  return (
    <div className="App Solution">
      <SlowComponent noSlowdown={10000000 % 2} />
      <FastComponent1 />
      <FastComponent2 />
      <FastComponent3 />
      <StateNoise />
    </div>
  );
}
