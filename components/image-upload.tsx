"use client";

import { ImagePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "./ui/button";
interface ImageloadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageloadProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
  if (result?.info?.secure_url) {
    onChange(result.info.secure_url);
  }
};



  if (!mounted) return null;
  return (
    <div className="">
      <div className="mb-4 lex flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => {
                  onRemove(url);
                }}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload}
        options={{
          maxFiles: 5,
          multiple: true,
          sources: ["local", "url", "camera", "image_search", "google_drive", "dropbox"],
        }}
        uploadPreset="helpdesk">
        {({ open }) => {
          const onClick = () => {
            open()
          }
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" /> Upload image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  );
};