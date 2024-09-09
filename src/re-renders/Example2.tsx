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

const FastComponent3 = () => {
  console.log(`Fast Component 3 render`);
  return (
    <div>
      I am fassssst 3 .... See logs if I am rendered
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
      <div>
        Date = {dummy ?? ''}
        <span className="re-render">
          {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
        </span>
        <FastComponent3 />
      </div>
      <button onClick={() => setDummy(Date.now())}>Render!</button>
    </>
  );
};
const SilentFastComponent = () => {
  console.log(`Silent Fast Component`);
  return <div>Silent Fast Component</div>;
};

const FastComponent2 = () => {
  console.log(`Fast Component 2 render`);
  return (
    <div>I am fassssst 2 .... Random n = {(Math.random() * 100).toFixed()}</div>
  );
};

/**
 *
 * Rule of Thumb 1 -
 *      If parent state is changed,
 *      re-render all of the children even if the children don't access the state
 */
export default function Example2() {
  const [ignored, setState] = useState(0);
  React.useEffect(() => {
    let id = window.setInterval(() => {
      console.log(`Interval triggered`);
      // state change in parent => re-render all of the children
      setState((n) => n + 1);
    }, 1000 * 2);
    return () => {
      window.clearInterval(id);
    };
  }, []);
  return (
    <div className="App Solution">
      <SlowComponent noSlowdown={1 % 2} />
      <FastComponent1 />
      <SilentFastComponent />
      <FastComponent2 />
      <StateNoise />
    </div>
  );
}
