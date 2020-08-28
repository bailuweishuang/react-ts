import React, { FC, useState, DragEvent } from 'react';
import classNames from 'classnames';

export interface IDragProps {
  onFile: (files: FileList) => void;
}

export const Drag: FC<IDragProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const klass = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver
  });
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    onFile(e.dataTransfer.files);
    setDragOver(false);
  };
  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Drag;
