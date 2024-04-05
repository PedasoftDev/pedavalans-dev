import styled from "styled-components";

export const Card = styled.div`
background-color: rgb(255, 255, 255);
color: rgb(33, 43, 54);
transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
overflow: hidden;
box-shadow: rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px;
border-radius: 16px;
position: relative;
z-index: 0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 24px;
`;
