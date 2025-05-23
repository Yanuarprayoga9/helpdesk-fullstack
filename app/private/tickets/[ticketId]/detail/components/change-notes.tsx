"use client";

import { useEffect, useState } from "react";
import { Modal } from "../../../../../../components/ui/modal";
import { Button } from "../../../../../../components/ui/button";
import { Textarea } from "../../../../../../components/ui/textarea";

interface InputConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  loading: boolean;
}

export const InputConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: InputConfirmModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [changeNotes, setChangeNotes] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleConfirm = () => {
    onConfirm(changeNotes);
    setChangeNotes("");
    onClose();
  };

  return (
    <Modal
      title="Confirm Status Change"
      description="Provide a reason or notes for this status change."
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setChangeNotes("");
      }}
    >
      <div className="space-y-4">
        <Textarea
          placeholder="Enter notes for this change..."
          value={changeNotes}
          onChange={(e) => setChangeNotes(e.target.value)}
          rows={4}
        />
        <div className="pt-4 flex items-center justify-end space-x-2 w-full">
          <Button
            disabled={loading}
            variant="outline"
            onClick={() => {
              onClose();
              setChangeNotes("");
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading || changeNotes.trim() === ""}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
