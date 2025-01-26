import React from "react";

import logoSvg from "@/assets/icons/common/logo.svg";

import Modal from "@/components/common/Modal";
import Image from "next/image";

interface Props {
  title?: string;
  text?: JSX.Element;
  onClose: any;
  showLogo?: boolean;
  showLogoTitle?: boolean;
}

export const ModalRequest: React.FC<Props> = ({
  title,
  text = "",
  onClose,
  showLogo = true,
  showLogoTitle = true,
}) => (
  <Modal
    onClose={onClose}
    className="_px-6 lg:_p-20 _flex _flex-col _items-center _justify-center _gap-6 lg:_gap-10"
  >
    <>
      {title && (
        <div className="_text-2xl lg:_text-3xl _text-center _font-semibold">
          <span className="text-gradient">{title}</span>
        </div>
      )}
      {showLogo && (
        <div className="_flex _flex-col _items-center">
          <Image
            src={logoSvg}
            alt="Logo"
            className="_w-24 _h-16 lg:_w-36 lg:_h-auto"
          />
          {showLogoTitle && (
            <div className="_text-center _main-title _font-bold _mt-1">
              <span className="text-gradient">Take Your Time</span>
            </div>
          )}
        </div>
      )}
      <div className="_text-center _whitespace-pre">{text}</div>
    </>
  </Modal>
);
