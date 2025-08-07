import { useMediaQuery } from "react-responsive";

const useDevice = () => {
  const isMinMobile = useMediaQuery({ maxWidth: 424 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isMinDesktop = useMediaQuery({ minWidth: 1280 });
  const isMaxDesktop = useMediaQuery({ minWidth: 1440 });

  return { isMinMobile, isMobile, isTablet, isMinDesktop, isMaxDesktop };
};

export default useDevice;
