import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { heightScale, widthScale } from "../../styles/responsive";
export const LocationIcon = (props : any) => (
  <Svg
    width={widthScale(15)}
    height={heightScale(21)}
    viewBox="0 0 15 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.6343 7.50694C10.6343 9.47968 9.02718 11.0802 7.04471 11.0802C5.06195 11.0802 3.45511 9.47968 3.45511 7.50694C3.45511 5.53364 5.06223 3.93372 7.04471 3.93372C9.0276 3.93357 10.6343 5.5335 10.6343 7.50694ZM14.3586 7.50694C14.3586 3.55991 11.1446 0.360352 7.17932 0.360352C3.21438 0.360352 0 3.55991 0 7.50694C0 9.24233 0.622019 10.8335 1.65566 12.0712L7.18553 20.0134L12.7963 11.9553C12.9978 11.7043 13.1823 11.4397 13.3489 11.1616L13.4056 11.0806H13.3963C14.0073 10.0287 14.3586 8.80926 14.3586 7.50694Z"
      fill="#C08F54"
    />
  </Svg>
);
export default LocationIcon;
