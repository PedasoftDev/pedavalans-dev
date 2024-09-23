import styled from 'styled-components'

export const GridContainer = styled.div`
  width: calc(100vw - 400px);
  height: calc(-150px + 100vh);
  @media (max-width: 1200px) {
    width: 100%;
  }
`
export const ResponsiveDiv = styled.div`
  width: calc(100vw - 400px);
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1200px) {
    width: auto;  // 1200px'den küçük ekranlarda width kaldırılır
  }
`;