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
      className={`_fixed _top-0 _left-0 _w-full _h-full _flex
        _items-center _justify-center _bg-black _bg-opacity-40 _z-50`}
    >
      <div className="_relative mobile-none">
        <div className="loader-circle-left" />
        <div className="loader-circle-central" />
        <div className="loader-circle-right" />
        <Image src={loaderSvg} alt="" />
      </div>
      <div className="_relative mobile-only">
        <div className="loader-circle-left" />
        <div className="loader-circle-central" />
        <div className="loader-circle-right" />
        <Image src={loaderMobileSvg} alt="" />
      </div>
    </div>
  ) : null;
}

export default Loader;
