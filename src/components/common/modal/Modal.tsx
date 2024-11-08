import { useRef, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/store/modal/useModalStore";

interface ModalProps {
  children?: React.ReactNode;
}
export const Modal = ({ children }: ModalProps) => {
  const isOpen = useModalStore((state) => state.isOpen);
  const close = useModalStore((state) => state.close);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      close();
    }
  };

  if (!isOpen || typeof window === "undefined") return null;
  return createPortal(
    <div
      ref={modalRef}
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      {children}
    </div>,
    document.body
  );
};
