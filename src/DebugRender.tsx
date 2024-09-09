import React, { useState } from 'react';

const STYLING_1 = {
  color: 'red',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 10px',
  display: 'inline-block',
  fontFamily: 'Monaco',
  padding: '10px',
};

const STYLING_2 = {
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '5px 10px',
  display: 'inline-block',
  fontFamily: 'Monaco',
  padding: '10px',
  backgroundColor: 'hsla(264, 28%, 59%, 1)',
  borderRadius: '5px',
};

// key is <span style={STYLING_1}>RE-RENDER - {Math.floor(Math.random() * 100)}</span>

export const DebugRender = () => {
  return (
    <span style={STYLING_1}>RE-RENDER - {Math.floor(Math.random() * 100)}</span>
  );
};

/*
<span className='re-render'> RE-RENDER - {Math.floor(Math.random() * 100)} </span>

<span className='re-render-sm'>{'RE-RENDER - ' + Math.floor(Math.random() * 100)}</span>

<span className='re-render'>
  {`RE-RENDER -  ${Math.floor(Math.random() * 100)}`}
</span>


index.css

.re-render, .re-render-sm {
  color: red;
  font-family: 'Monaco', sans-serif;
  font-wieght: bold;
  display: inline-block;
  font-size: 12px;
  padding: 0 10px;
}

.re-render-sm {
  font-size: 10px;
}

*/
