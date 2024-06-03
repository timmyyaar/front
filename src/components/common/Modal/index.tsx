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
          className={`custom-scroll _w-[95%] lg:_w-auto _min-h-[80%] _min-w-[80%]
            _absolute _p-4 lg:_p-20 _top-1/2 _left-1/2 _-translate-y-2/4
            _-translate-x-2/4 _rounded-2xl _overflow-auto _overflow-x-hidden ${
              className || ""
            } ${isWhiteBackground ? "_bg-white" : "_bg-light"}`}
        >
          {showCloseIcon && (
            <div
              className="_absolute _right-4 _top-4 _cursor-pointer"
              onClick={onClose}
            >
              <CloseSvg className="hover:_text-primary _transition-all" />
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
