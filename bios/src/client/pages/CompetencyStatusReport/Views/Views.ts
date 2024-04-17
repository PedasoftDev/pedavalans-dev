import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: calc(100vw - 330px);
    `;

const SelectItems = styled.div`
    display: flex;
    gap: 20px;
    `;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: calc(100vh - 175px);
    overflow-y: auto;
    `;

const ListItem = styled.div`
    display: flex;
    gap: 20px;
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    `;

const ListEmployeeIcon = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const ListEmployeeName = styled.div`
    display: flex;
    align-items: center;
    width: 35%;
    font-size: 16px;
    font-weight: 600
    `;

const ListEmployeePercentage = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    height: 50px;
    width: 50px;
    `;

const ListEmployeeLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 65%;
    `;

const ListEmployeeLinkIcon = styled.div`
    transition: 0.3s all ease;
    padding: 5px;
    &:hover {
        background-color: #f0f0f0;
        border-radius: 50%;
    }
    `;


export const Views = {
    Container,
    SelectItems,
    List,
    ListItem,
    ListEmployeeIcon,
    ListEmployeeName,
    ListEmployeePercentage,
    ListEmployeeLink,
    ListEmployeeLinkIcon
};