import React from 'react';
import useComponentSlots from '../hooks/useComponentSlots';
import styled from 'styled-components';

const StyledLi = styled.li`
    max-width: 900px;
    padding: 10px;
    list-style-type: none;
    border: 1px solid #333;
    border-width: 1px 0;
    margin: 0;

    & ~ & {
      border-top: none;
    }

    &:nth-of-type(odd) {
      background-color: #eee;
    }

    h4 {
      margin: 0;
    }

    & > span {
      float: right;

      button ~ button {
        margin-left: 10px;
      }
    }
`;
export const ActionListItem = ({ children }) => {
  const [Slot] = useComponentSlots(children);
  return (
    <StyledLi className="actionitem">
      <span>
        <Slot name="actions"></Slot>
      </span>
      <h4>
        <Slot name="title">Unnamed Item</Slot>
      </h4>
    </StyledLi>
  );
};
