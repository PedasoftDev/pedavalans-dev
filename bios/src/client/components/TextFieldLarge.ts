import styled from "styled-components";

const TextFieldLarge = styled.input`
    border: 1px solid #ccc;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    &:focus {
        border-color: #3BA2EE;
    }
`;

export default TextFieldLarge;