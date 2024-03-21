import React from 'react';
import Image from 'next/image';

import { CloseSvg } from '@/components/common/icons/closeButton';

import img from './Frame 1262.png';
import './style.scss';

interface Props {
  title: string;
  text: string;
  onClose: any
}

export const ModalRequest: React.FC<Props> = ({ title, text, onClose }) => (
  <div className="modal-request-wrapper">
    <div className="icon-wrapper-modal" onClick={onClose}>
      <CloseSvg />
    </div>
    <div className='title'>{title}</div>
    <Image src={img} alt='' />
    <div className='text'>{text}</div>
  </div>
);
