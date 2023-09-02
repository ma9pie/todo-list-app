export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  const { userAgent } = navigator;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    // 'tablet';
    return true;
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent
    )
  ) {
    // 'mobile';
    return true;
  }
  return false;
};
