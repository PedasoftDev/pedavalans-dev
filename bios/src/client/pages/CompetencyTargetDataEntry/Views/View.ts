import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: calc(100vw - 290px);
    height: calc(100vh - 70px);
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 100%;
    overflow: hidden;
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
    overflow: hidden;
`;

export const LeftContainerHeader = styled.div`
    display: flex;
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const RightContainerHeader = styled.div`
    display: flex;
    height: 50px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;