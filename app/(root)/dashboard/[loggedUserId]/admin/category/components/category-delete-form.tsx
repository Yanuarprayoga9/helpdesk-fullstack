import { deteleCategory } from '@/actions/category';
import { AlertModal } from '@/components/confirm-modal';
import { Trash } from 'lucide-react';
import {  useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
type CategoryDeleteFormProps = {
    categoryId?: string;
};
export const CategoryDeleteForm:React.FC<CategoryDeleteFormProps> = ({categoryId}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        
        let response;
                if (categoryId) {
                    response = await deteleCategory(categoryId);
        
        
                    setLoading(false);
        
                    if (!response.success) {
                        toast.error(response.message || "action error", { id: "category" });
                    } else {
                        toast.success("Category deleted successfully!");
                        setOpen(false); // Tutup modal
                        router.refresh();
                    }
                }
    };

    const handleCLose = () => {
        setOpen(!open)
    }
    return (
        <div>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={handleCLose}
                onConfirm={handleConfirm}
            />
            <Trash className='w-4 h-4 text-red-500' onClick={handleCLose} />
        </div>
    )
}


