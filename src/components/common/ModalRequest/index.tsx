import React from "react";

import { CloseSvg } from "@/components/common/icons/closeButton";
import LogoBig from "@/components/common/icons/components/LogoBig";

import "./style.scss";

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
  <div className="modal-request-wrapper">
    <div className="icon-wrapper-modal" onClick={onClose}>
      <CloseSvg />
    </div>
    {title && (
      <div className="title">
        <span className="text-gradient">{title}</span>
      </div>
    )}
    {showLogo && (
      <div className="_flex _flex-col _items-center">
        <LogoBig className="logo-icon" />
        {showLogoTitle && (
          <div className="_text-center logo-title _mt-1">
            <span className="text-gradient">Take Your Time</span>
          </div>
        )}
      </div>
    )}
    <div className="_text-center _whitespace-pre">{text}</div>
  </div>
);
