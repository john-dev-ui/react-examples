import React, { useEffect, useState } from 'react';

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

const makeItSlow = (noSlowdown) => {
  const arr = [];
  if (!noSlowdown) {
    for (var i = 1000000 - 1; i >= 0; i--) {
      arr.push(i);
    }
  }
};

const SlowComponent = ({ noSlowdown }) => {
  makeItSlow(noSlowdown);
  sleepFor(100);

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
  let n = Math.floor(Math.random() * 100);
  useEffect(() => {
    console.log(`Fast component re-render ${n}`);
  });
  return (
    <div>
      I am fassssst 1 ....
      <span className="re-render">{`RE-RENDER -  ${n}`}</span>
    </div>
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

/**
 * State dummy is changed
 * Rule of Thumb 1 - If parent state is changed, re-render all of the children even if the children don't access the state
 */
export function Example1() {
  const [dummy, setDummy] = useState();
  return (
    <div className="Example1">
      <SlowComponent noSlowdown={dummy % 2} />
      <FastComponent1 />
      <FastComponent2 />
      <FastComponent3 />
      <div>Date = {dummy ?? ''}</div>
      <button onClick={() => setDummy(Date.now())}>Render!</button>
    </div>
  );
}
