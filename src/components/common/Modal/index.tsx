import React, { JSX, useEffect } from "react";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { Overlay } from "@/components/common/Overlay";

import "./style.scss";
import { CloseSvg } from "@/components/common/icons/closeButton";

interface ModalProps {
  onClose: () => void;
  showCloseIcon?: boolean;
  closeOnOutsideClick?: boolean;
  children: JSX.Element;
}

function Modal({
  onClose,
  showCloseIcon = true,
  closeOnOutsideClick = true,
  children,
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

  return (
    <Overlay active>
      <div ref={modalRef}>
        <div className="modal-wrapper custom-scroll">
          {showCloseIcon && (
            <div className="icon-wrapper-modal" onClick={onClose}>
              <CloseSvg />
            </div>
          )}
          {children}
        </div>
      </div>
    </Overlay>
  );
}

export default Modal;
