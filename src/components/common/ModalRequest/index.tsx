import React, { type JSX } from "react";

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
    className="px-6 lg:p-20 flex flex-col items-center justify-center gap-6 lg:gap-10"
  >
    <>
      {title && (
        <div className="text-2xl lg:text-3xl text-center font-semibold">
          <span className="text-gradient">{title}</span>
        </div>
      )}
      {showLogo && (
        <div className="flex flex-col items-center">
          <Image
            src={logoSvg}
            alt="Logo"
            className="w-24 h-16 lg:w-36 lg:h-auto"
          />
          {showLogoTitle && (
            <div className="text-center main-title font-bold mt-1">
              <span className="text-gradient">Take Your Time</span>
            </div>
          )}
        </div>
      )}
      <div className="text-center whitespace-pre">{text}</div>
    </>
  </Modal>
);
