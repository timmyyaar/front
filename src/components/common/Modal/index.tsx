import React, { JSX, useEffect } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { Overlay } from "@/components/common/Overlay";

import { CloseSvg } from "@/components/common/icons/closeButton";

interface ModalProps {
  onClose: () => void;
  showCloseIcon?: boolean;
  closeOnOutsideClick?: boolean;
  children: JSX.Element;
  className?: string;
  isWhiteBackground?: boolean;
}

function Modal({
  onClose,
  showCloseIcon = true,
  closeOnOutsideClick = true,
  children,
  className,
  isWhiteBackground,
}: ModalProps) {
  const modalRef = useClickOutside(() => {
    if (closeOnOutsideClick) {
      onClose();
    }
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return createPortal(
    <Overlay active>
      <div ref={modalRef}>
        <div
          className={`custom-scroll w-[95%] lg:w-auto min-h-[80%] min-w-[80%]
            absolute p-4 lg:p-20 top-1/2 left-1/2 -translate-y-2/4
            -translate-x-2/4 rounded-2xl overflow-auto overflow-x-hidden ${
              className || ""
            } ${isWhiteBackground ? "bg-white" : "bg-light"}`}
        >
          {showCloseIcon && (
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={onClose}
            >
              <CloseSvg className="hover:text-primary transition-all" />
            </div>
          )}
          {children}
        </div>
      </div>
    </Overlay>,
    document.body
  );
}

export default Modal;
