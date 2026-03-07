import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (
      import.meta.env.PROD &&
      window.gtag
    ) {
      window.gtag("config", "G-QH4H0YW0TQ", {
        page_path: location.pathname,
      });
    }
  }, [location]);
}
