import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { heightScale, widthScale } from "../../styles/responsive";
export const ArrowDownLocation = (props :any) => (
  <Svg
    width={widthScale(16)}
    height={heightScale(10)}
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.7021 0.58115L15.626 1.53758L8.24844 9.67989L0.627737 1.76467L1.51763 0.780771L8.21899 7.7348L14.7021 0.58115Z"
      fill="#C08F54"
    />
  </Svg>
);
export default ArrowDownLocation;
