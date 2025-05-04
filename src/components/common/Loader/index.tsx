"use client";

import Image from "next/image";
import loaderSvg from "./icons/loader.svg";
import loaderMobileSvg from "./icons/loader-mobile.svg";

import "./style.scss";

interface LoaderProps {
  isLoading?: boolean;
}

function Loader({ isLoading }: LoaderProps) {
  return isLoading ? (
    <div
      className={`fixed top-0 left-0 w-full h-full flex
        items-center justify-center bg-black/40 z-50`}
    >
      <div className="relative mobile-none">
        <div className="loader-circle-left" />
        <div className="loader-circle-central" />
        <div className="loader-circle-right" />
        <Image src={loaderSvg} alt="" />
      </div>
      <div className="relative mobile-only">
        <div className="loader-circle-left" />
        <div className="loader-circle-central" />
        <div className="loader-circle-right" />
        <Image src={loaderMobileSvg} alt="" />
      </div>
    </div>
  ) : null;
}

export default Loader;
