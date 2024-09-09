import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
import SlotsApp from './SlotsApp';
import SelectApps from './SelectApps';
import { Example1 } from './re-renders/Example1';

import './index.css';

console.log(`Rendering slots app`);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SelectApps/>
  </StrictMode>
);

console.log(`successfully rendered Slots App`);
