// https://stackoverflow.com/questions/50817672/does-new-react-context-api-trigger-re-renders

import React from 'react';
import {
  randomColor,
  useRenderCount,
  randomColor2,
  randomSadEmoji,
  useVisualRenderCount,
} from './utils';
const AppContext = React.createContext();

const Number = (props) => {
  const ref = useVisualRenderCount('Number');
  const renderCount = useRenderCount();
  const contextNo = React.useContext(AppContext);
  return (
    <div ref={ref} style={{ backgroundColor: `${randomColor()}` }}>
      Number: rendered {renderCount.current} times.
      <span className="re-render">
        {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
      </span>
    </div>
  );
};

const NumberMemo = React.memo(Number);

const Text = () => {
  const renderCount = useRenderCount();
  // Try commenting out this one
  const context = React.useContext(AppContext);
  return (
    <div style={{ backgroundColor: `${randomColor()}` }}>
      Text: rendered {renderCount.current} times. I rerender with context value
      changes!
      <span className="re-render">
        {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
      </span>
    </div>
  );
};

const TextMemo = React.memo(Text);

const Silent1 = () => {
  const renderCount = useRenderCount();

  return (
    <div style={{ backgroundColor: `${randomColor()}` }}>
      Silent: rendered {renderCount.current} times. Doesn't use `useContext`
      <h1>{randomSadEmoji()} </h1>
      <p>
        <ol>
          <li>
            No <code>props</code> paramter to me.
          </li>
          <li>
            No <code>useContext</code> inside me.
          </li>
          <li>
            But my parent changes it's local state using <code>useState</code>.
            <p>
              {' '}
              That's why I render to keep my parent happy though I don't read
              it's state
            </p>
          </li>
        </ol>
      </p>
      <span className="re-render">
        {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
      </span>
    </div>
  );
};

const Silent2 = () => {
  const renderCount = useRenderCount();
  // Try commenting out this one
  const ref = useVisualRenderCount('Silent2');
  return (
    <div
      ref={ref}
      style={{ backgroundColor: `${randomColor()}`, position: 'relative' }}
    >
      Silent: rendered {renderCount.current} times. Doesn't use `useContext`
      <h1>😄</h1>
      <p>
        <ol>
          <li>
            No <code>props</code> paramter to me.
          </li>
          <li>
            No <code>useContext</code> inside me.
          </li>
          <li>
            If you wrap me with <code>React.memo</code>, I ignore state changes
            in the parent.
            <p> A wrapper around me takes care of it</p>
          </li>
        </ol>
      </p>
      <span className="re-render">
        {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
      </span>
    </div>
  );
};

const SilentMemo = React.memo(Silent2);

const App = () => {
  const [ctxVal, setCtxVal] = React.useState(0);
  const [prop, setProp] = React.useState(0);
  return (
    <div className="App">
      <AppContext.Provider value={ctxVal}>
        <Silent1 />

        <NumberMemo no={prop} />
        <span className="re-render">
          {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
        </span>
        <TextMemo />

        <SilentMemo />

        <button onClick={() => setCtxVal(ctxVal + 1)}>
          Change context value
        </button>
        <button onClick={() => setProp(prop + 1)}>
          Only change prop in Number
        </button>
      </AppContext.Provider>
    </div>
  );
};

export default App;
