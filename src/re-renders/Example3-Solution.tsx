import React from 'react';

import { counterContext } from './contexts';

const EMPTY = {};
const CounterContextProvider = () => {
  const [count, setCount] = React.useState(0);

  return (
    <counterContext.Provider value={EMPTY} className="App">
      <button onClick={() => setCount((prev) => prev + 1)}>Change state</button>
      {/* 
        ComponentOne cannot be stopped from re-rendering 
            when count changes via setCount
      */}
      <ComponentOne />
      <ComponentTwo />
    </counterContext.Provider>
  );
};

const ComponentOne = () => {
  console.log('ComponentOne renders');
  return <div></div>;
};

const ComponentTwo = () => {
  console.log('ComponentTwo renders ');
  return <div></div>;
};
function App() {
  return (
    <div className="App">
      <CounterContextProvider />
    </div>
  );
}

export default App;
