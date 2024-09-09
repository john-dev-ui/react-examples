import React from 'react';

export function useRenderCount() {
  const renderCount = React.useRef(1);
  React.useEffect(() => {
    renderCount.current += 1;
  });
  return renderCount;
}
// index.css contains the styles related to it
export function useVisualRenderCount(name: string) {
  const state = React.useRef({ count: 0, initalized: false });
  const elementRef = React.useRef(null);
  React.useEffect(() => {
    state.current.count += 1;

    // elementRef.current?.style?.setProperty(
    //   '--renderCount',
    //   state.current.count + ''
    // );

    elementRef.current?.setAttribute('data-render-count', state.current.count);

    if (!state.current.initalized) {
      if (elementRef.current?.classList?.add) {
        elementRef.current?.classList.add('show-render-count');
        state.current.initalized = true;
      }
    }
    console.log(`${name} rendered ${state.current.count}`);
  });
  return elementRef;
}

export function randomColor2() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

export function randomColor() {
  const startSaturation = 35;
  const startLightness = 65;
  const hue = Math.random() * 360;
  const saturation = startSaturation + Math.random() * 20;
  const lightness = startLightness + Math.random() * 20;
  const color = `hsl(${hue},${saturation}%,${lightness}%)`;
  return color;
}

const SAD_EMOJIS = ['😥', '😨', '😫', '😫', '😳', '😳', '😭', '🥺', '😫', '😫'];

export const randomSadEmoji = () => {
  let index = (Math.random() * (SAD_EMOJIS.length - 1)).toFixed();
  return SAD_EMOJIS[index];
};
