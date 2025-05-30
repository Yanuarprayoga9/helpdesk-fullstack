'use client';

import { softDeleteUserById } from '@/actions/user'; // Ganti dengan path sesuai project kamu
import { AlertModal } from '@/components/confirm-modal';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type UserDeleteFormProps = {
  userId?: string;
};

export const UserDeleteForm: React.FC<UserDeleteFormProps> = ({ userId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!userId) return;

    setLoading(true);
    const response = await softDeleteUserById(userId);
    setLoading(false);

    if (!response.success) {
      toast.error(response.message || "Failed to delete user", { id: "user" });
    } else {
      toast.success("User deleted successfully!");
      setOpen(false);
      router.refresh();
    }
  };

  const handleToggle = () => setOpen(!open);

  return (
    <div>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={handleToggle}
        onConfirm={handleConfirm}
      />
      <Trash className="w-4 h-4 text-red-500 cursor-pointer" onClick={handleToggle} />
    </div>
  );
};
