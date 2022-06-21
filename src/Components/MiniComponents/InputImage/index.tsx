import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ButtonComp from "../ButtonComp";

import styles from "./InputImage.module.css";

import Config from "Configs";
const apiHost = Config.apiHost;

interface InputImageProps {
  onChange?: (file: File) => void;
  img?: string | null;
  deleteImg?: any;
}

export default function InputImage({
  onChange,
  img,
  deleteImg,
}: InputImageProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [drag, setDrag] = useState(false);

  function dragStartHandler(
    e: React.DragEvent<HTMLImageElement | HTMLDivElement>
  ) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(
    e: React.DragEvent<HTMLImageElement | HTMLDivElement>
  ) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(
    e: React.DragEvent<HTMLImageElement | HTMLDivElement>
  ) {
    e.preventDefault();
    uploadFile(e.dataTransfer.files[0]);
    setDrag(false);
  }

  function uploadFile(file: File) {
    if (onChange) {
      onChange(file);
    }
  }

  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={inputFileRef}
        type={"file"}
        accept=".jpeg,.jpg,.png"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            uploadFile(e.target.files[0]);
          }
        }}
      />

      {img ? (
        <div className={styles.imageLogo}>
          <img
            src={apiHost + img}
            alt={"Preview"}
            style={{ opacity: drag ? 0.7 : 1 }}
            onDrop={onDropHandler}
            onDragStart={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
          />
        </div>
      ) : (
        <div
          className={styles.LogoPreview}
          style={{ background: drag ? "#f2f2f2" : "" }}
          onDrop={onDropHandler}
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
        />
      )}

      <div>
        <Button
          variant="outline-secondary"
          onClick={() => {
            inputFileRef.current?.click();
          }}
        >
          Upload new logo
        </Button>
        {img && deleteImg && (
          <ButtonComp icon={"trash"} intent={"close-light"} />
        )}
      </div>
    </div>
  );
}
