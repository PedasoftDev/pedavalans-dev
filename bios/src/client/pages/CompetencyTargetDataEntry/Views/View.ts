import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: calc(100vw - 290px);
    height: calc(100vh - 70px);
    padding: 5px 0;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 100%;
    overflow: hidden;
    padding: 10px;
    gap: 10px;
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
    flex-direction: column;
    gap: 10px;
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

export const LeftContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    gap: 10px;
    `;

export const LeftContainerContentItem = styled.div<{ selected: boolean }>`
    display: flex;
    width: 100%;
    height: 50px;
    border: 1px solid ${({ selected }) => selected ? '#3BA2EE' : 'rgb(211 211 211 / 48%)'};
    border-radius: 5px;
    padding: 10px;
    gap: 10px;
    align-items: center;
    cursor: pointer !important;
`;