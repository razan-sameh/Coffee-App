import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { heightScale, widthScale } from "../../styles/responsive";
const WishListIcon = (props : any) => (
  <Svg
    width={widthScale(21)}
    height={heightScale(19)}
    viewBox="0 0 21 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.25 18.35L8.8 17.035C3.65 12.36 0.25 9.275 0.25 5.5C0.25 2.415 2.665 0 5.75 0C7.49 0 9.16 0.81 10.25 2.085C11.34 0.81 13.01 0 14.75 0C17.835 0 20.25 2.415 20.25 5.5C20.25 9.275 16.85 12.36 11.7 17.035L10.25 18.35Z"
      fill={props.color}
    />
  </Svg>
);
export default WishListIcon;
