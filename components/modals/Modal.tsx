"use client";

import { useCallback, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};
export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel
}: Props) => {
  if (!isOpen) return;
  const [showModal, setShowModal] = useState<boolean>(isOpen);
  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction])

  return (
    <div className="fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 flex justify-center items-center overflow-x-hidden overflow-y-auto ">
      <div className="w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div className={`translate duration-300 h-full 
          ${showModal ? "translate-y-0": "translate-y-full"}
          ${showModal ? "opacity-100": "opacity-0"}
        `}>
          <div className="flex flex-col bg-white outline-none focus:outline-none h-full w-full lg:h-auto md:h-auto border-none rounded-lg shadow-lg translate">
            {/* head */}
            <div className="relative flex items-center justify-center p-6 border-b-[1px]">
              <button 
                onClick={handleClose}
                className="absolute left-9 p-1 border-0 hover:opacity-70 transition">
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* body */}
            <div className="p-6 flex-auto">{body}</div>
            {/* submit and footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline 
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    disabled={disabled}
                  />
                )}
                <Button 
                  label={actionLabel}
                  onClick={handleSubmit}
                  disabled={disabled}
                />
              </div>
              <div>{footer}</div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}