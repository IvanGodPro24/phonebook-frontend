import { ChangeEvent, DragEvent, useId, useState, forwardRef } from "react";
import { UploadPhotoProps } from "./UploadPhoto.types";
import clsx from "clsx";

const UploadPhoto = forwardRef<HTMLInputElement, UploadPhotoProps>(
  ({ onChange }: UploadPhotoProps, ref) => {
    const photoId = useId();

    const [isDragActive, setIsDragActive] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const fileList = e.dataTransfer.files;
        const syntheticEvent = {
          target: { files: fileList },
        } as unknown as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
        e.dataTransfer.clearData();
      }
    };

    return (
      <label
        htmlFor={photoId}
        className={clsx(
          "mt-5 cursor-pointer bg-[#333] py-7.5 px-15 rounded-4xl border-2 border-dashed border-[#666] shadow-[0_0_200px_-50px_rgba(0,0,0,0.5)] text-[#eee]",
          isDragActive && "border-[var(--primary)] bg-[var(--deep-space)]"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-1.25">
          <svg
            viewBox="0 0 640 512"
            height="1em"
            className="h-12.5 fill-[#666] mb-5"
          >
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
          </svg>
          <p>Drag and Drop</p>
          <p>or</p>
          <span className="bg-[#666] py-1.25 px-3.5 rounded-xl text-[#eee] transition duration-300 hover:bg-[#888] hover:text-[#fff]">
            Browse file
          </span>
        </div>
        <input
          type="file"
          id={photoId}
          ref={ref}
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
      </label>
    );
  }
);

export default UploadPhoto;
