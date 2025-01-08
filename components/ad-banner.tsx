"use client";
import { useEffect, useRef } from "react";
export default function Banner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atOptions = {
      key: "6c665e27998b6161c3cb2253e92e6d88",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);

  return (
    <div
      className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center"
      ref={banner}
    ></div>
  );
}
