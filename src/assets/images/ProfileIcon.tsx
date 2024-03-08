import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { heightScale, widthScale } from "../../styles/responsive";
const ProfileIcon = (props : any) => (
  <Svg
    width={widthScale(23)}
    height={heightScale(16)}
    viewBox="0 0 23 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21.4999 3.42041L16.3203 8.79541L13.584 6.05905"
      stroke={props.color}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M7.81827 7.81818C9.9772 7.81818 11.7274 6.06802 11.7274 3.90909C11.7274 1.75016 9.9772 0 7.81827 0C5.65934 0 3.90918 1.75016 3.90918 3.90909C3.90918 6.06802 5.65934 7.81818 7.81827 7.81818Z"
      fill={props.color}
    />
    <Path
      d="M7.81818 9.77295C1.85682 9.77295 0 13.682 0 13.682V15.6366H15.6364V13.682C15.6364 13.682 13.7795 9.77295 7.81818 9.77295Z"
      fill={props.color}
    />
  </Svg>
);
export default ProfileIcon;
