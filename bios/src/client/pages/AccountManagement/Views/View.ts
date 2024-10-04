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

// style={{
//   position: 'absolute', top: '50%', left: '50%',
//   transform: 'translate(-50%, -50%)',
//   backgroundColor: 'white',
//   minWidth: '600px',
//   padding: '30px',
//   borderRadius: '8px',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// }}

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  min-width: 600px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;