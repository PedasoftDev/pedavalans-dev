import styled from "styled-components";

const Main = styled.main`
  -webkit-box-flex: 1;
  flex-grow: 1;
  height: 100wh;
  width: calc(100vw - 310.50px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  width: width: 100%;
  padding: 20px;
  background-color: #eef2f6;
  @media (max-width: 1200px) {
    width: 100vw;
  }
`;

export default Main;
