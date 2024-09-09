import React from 'react';
import { Example1 } from './re-renders/Example1';
import Example1Sol from './re-renders/Example1-Solution';
import Example2 from './re-renders/Example2';
import CounterContextApp from './re-renders/Example3';
import NumberContextApp from './re-renders/Example4';
import CounterContextApp31 from './re-renders/Example3-1';
import styled from 'styled-components';

const EXAMPLE_1 = { name: 'Example1', title: 'React Slow Re-Render Example' };
const EXAMPLE_2 = {
  name: 'Example2',
  title: 'setInterval(2s) call setState',
};

const EXAMPLE_3 = {
  name: 'Example3',
  title: 'Counter Context App',
};

const EXAMPLE_4 = {
  name: 'Example4',
  title: 'React.memo + Context ',
};

const EXAMPLE_31 = {
  name: 'Example3-1',
  title: 'Provier value same empty object',
};

const EXAMPLE_1_SOL = {
  name: 'Example1Sol',
  title: 'Isolate state changes to new Components',
};

let allApps = [
  EXAMPLE_1,
  EXAMPLE_1_SOL,
  EXAMPLE_2,
  EXAMPLE_3,
  EXAMPLE_31,
  EXAMPLE_4,
];

const Wrapper = styled.div`

  padding: 10px;
  border: 1px solid dodgerblue;

`;
const SelectApps = () => {
  const [app, setApp] = React.useState(EXAMPLE_1);

  let selected = <Example1 />;
  if (app === EXAMPLE_1_SOL) {
    selected = <Example1Sol />;
  } else if (app === EXAMPLE_1) {
    selected = <Example1 />;
  } else if (app === EXAMPLE_2) {
    selected = <Example2 />;
  } else if (app === EXAMPLE_3) {
    selected = <CounterContextApp />;
  } else if (app === EXAMPLE_31) {
    selected = <CounterContextApp31 />;
  } else if (app === EXAMPLE_4) {
    selected = <NumberContextApp />;
  }

  return (
    <Wrapper>
      <div>
        {allApps.map((app) => (
          <button id={app.name} key={app.name} onClick={(e) => setApp(app)}>
            {app.name}
          </button>
        ))}
        <hr />
        <h3>{app.title} </h3>
        <div className="app-wrapper">{selected}</div>
        <hr />
        <span className="re-render">
          {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
        </span>
      </div>
    </Wrapper>
  );
};

export default SelectApps;
