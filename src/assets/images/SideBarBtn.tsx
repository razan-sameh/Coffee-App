import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { heightScale,widthScale } from "../../styles/responsive";
export const SideBarBtn = (props : any) => (
    <Svg
    width={widthScale(20)}
    height={heightScale(14)}
    viewBox="0 0 20 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H1C0.447715 2 0 1.55228 0 1Z"
      fill="#C08F54"
    />
    <Path
      d="M0 7C0 6.44772 0.447715 6 1 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H1C0.447715 8 0 7.55228 0 7Z"
      fill="#C08F54"
    />
    <Path
      d="M0 13C0 12.4477 0.447715 12 1 12H19C19.5523 12 20 12.4477 20 13C20 13.5523 19.5523 14 19 14H1C0.447715 14 0 13.5523 0 13Z"
      fill="#C08F54"
    />
  </Svg>
);
export default SideBarBtn;