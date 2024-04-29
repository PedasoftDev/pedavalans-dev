import styled from "styled-components"

const ContainerDataGrid = styled.div`
  height: calc(100vh - 150px);
  width: calc(100vw - 330px);
  @media (max-width: 1200px) {
    width: calc(100vw - 50px);
  }
`

const DialogLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`

export const GridContainer = styled.div`
  width: calc(-330px + 100vw);
  height: calc(-150px + 100vh);
  @media (max-width: 1200px) {
    width: 100%;
  }
`

export { ContainerDataGrid, DialogLabel }