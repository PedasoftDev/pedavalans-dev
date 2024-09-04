import React from 'react';
import styled from 'styled-components';

// Styled-components ile stil oluşturma
const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FileLabel = styled.label`
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: rgba(55, 116, 203, 1);
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(48, 103, 189, 1);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

// React bileşeni
const FileUploadButton = ({ onFileChange }) => {
  return (
    <FileInputContainer>
      <FileLabel htmlFor="file-upload">Belge Yükle</FileLabel>
      <HiddenFileInput
        id="file-upload"
        type="file"
        onChange={onFileChange}
      />
    </FileInputContainer>
  );
};

export default FileUploadButton;
