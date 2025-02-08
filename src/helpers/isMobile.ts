const breakPoint = 768

export function isMobileScreen(MOBILE_BREAKPOINT: number = breakPoint) {
  return window.innerWidth < MOBILE_BREAKPOINT
}
