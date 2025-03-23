"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { updateUserById } from "@/actions/user";
import toast from 'react-hot-toast' // Import toast

type ProfileImageProps = {
  imageUrl: string;
  userId: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, userId }) => {
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [loading, setLoading] = useState(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadSuccess = (result: any) => {

    if (!result?.info?.secure_url) {
      alert("Upload failed! Please try again.");
      return;
    }

    const newImageUrl = result.info.secure_url;

    setLoading(true);

    updateUserById(userId, { imageUrl: newImageUrl })
      .then((response) => {
        if (response?.success) {
          setCurrentImage(newImageUrl);
          toast.success("Avatar updated successfully", { id: "avatar" });

        } else {
          alert("Failed to update profile image!");
        }
      })
      .catch(() => {
        alert("Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

//   const onRemove = async () => {
//     setLoading(true);

//     try {
//       const response = await updateUserById(userId, { imageUrl: "/default-avatar.png" });

//       if (response?.success) {
//         setCurrentImage("/default-avatar.png");
//       } else {
//         alert("Failed to remove profile image!");
//       }
//     } catch (error) {
//       console.error("Error removing image:", error);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
      <div className="relative w-40 h-40 rounded-full overflow-hidden border">
        <Image
          src={currentImage}
          alt="Profile Image"
          fill
          className="object-cover"
        />
      </div>
        <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-75 p-1 rounded-full">
          <CldUploadWidget
            uploadPreset="helpdesk"
            options={{ sources: ["local", "url"], multiple: false }}
            onSuccess={onUploadSuccess} // ✅ Fix: Ganti dari onUpload ke onSuccess
          >
            {({ open }) => (
              <Button
                variant="secondary"
                size="icon"
                onClick={() => {
                  open();
                }}
                disabled={loading}
              >
                {loading ? "..." : <Pencil className="w-5 h-5 text-white" />}
              </Button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      {/* {currentImage !== "/default-avatar.png" && (
        <Button variant="destructive" size="icon" onClick={onRemove} disabled={loading}>
          {loading ? "..." : <Trash className="w-5 h-5" />}
        </Button>
      )} */}
    </div>
  );
};

export default ProfileImage;
