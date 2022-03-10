/* eslint-disable jsx-a11y/label-has-associated-control */
import { IconButton, styled } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React, { FC, MutableRefObject, useRef, useState } from 'react';

type IProps = {
  onSelectFile: (e: any) => void;
  fileInputRef: MutableRefObject<HTMLInputElement>;
};

const Input = styled('input')({
  display: 'none',
});

const UploadButton: FC<IProps> = function ({ onSelectFile, fileInputRef }) {
  const openUpload = (e: any) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  return (
    <label htmlFor="icon-button-file">
      <Input
        accept="image/*"
        id="icon-button-file"
        type="file"
        ref={fileInputRef}
        onChange={onSelectFile}
      />
      <IconButton
        color="secondary"
        aria-label="upload picture"
        component="span"
        onClick={openUpload}
      >
        <FileUploadIcon />
      </IconButton>
    </label>
  );
};

export default UploadButton;
