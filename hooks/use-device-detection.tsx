"use client";

import { useState, useEffect } from "react";

export function useDeviceDetection() {
  const [isDesktopSite, setIsDesktopSite] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
      ];

      setIsMobileDevice(
        mobileKeywords.some((keyword) => userAgent.includes(keyword))
      );

      // Check if the viewport width is greater than typical mobile widths
      setIsDesktopSite(window.innerWidth > 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return { isDesktopSite, isMobileDevice };
}
