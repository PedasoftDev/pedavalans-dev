import styled from "styled-components";

const TaskCard = styled.div`
box-shadow: none;
background-image: none;
overflow: hidden;
border: 1px solid #90caf925;
overflow: hidden;
position: relative;
transition: all 0.5s ease-in-out;
&:after {
    content: " ";
    position: absolute;
    width: 220px;
    height: 220px;
    background: #1565c0;
    border-radius: 50%;
    top: -85px;
    right: -95px;
    opacity: 0.3;
    transition: 0.5s ease-in-out;
}
&:hover:after {
    width: 300px;
    height: 300px;
}
`;

const TaskCardHeader = styled.h2`
padding: 30px 15px;
margin: 0;
`;

const TaskCardSubHeader = styled.h1`
padding: 10px 15px;
`;

const ExpandIconRight = styled.div`
padding: 10px 15px;
color: #505A64;
display: flex;
justify-content: flex-end;
font-size: 20px;
color: lightgray;
`;

const List = styled.ul`
padding: 15px 15px;
list-style: none;
height: calc(100vh/1.6 - 100px);
overflow-y: auto;
`;

const ListElement = styled.li`
padding: 5px 0;
display: flex;
gap: 5px;
align-items: center;
&:hover {
    text-decoration: underline;
    cursor: pointer;
}
`;

export { TaskCard, TaskCardHeader, TaskCardSubHeader, ExpandIconRight, List, ListElement };