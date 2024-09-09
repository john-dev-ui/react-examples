import { forwardRef } from 'react';
import { useRenderCount } from './re-renders/utils';

const Box = forwardRef((props, ref) => {
  const count = useRenderCount();

  // passing the ref to a DOM element,
  // so that the parent has a reference to the DOM node
  // return <>{props.children}</>;
});
