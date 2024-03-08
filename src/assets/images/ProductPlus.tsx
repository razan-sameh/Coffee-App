import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import { heightScale, widthScale } from "../../styles/responsive";
const ProductPlus = (props : any) => (
  <Svg
    width={widthScale(24)}
    height={heightScale(24)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={24} height={24} rx={12} fill="#251919" />
    <Path
      d="M20.5714 10.5714H13.4286V3.42857C13.4286 2.64 12.7886 2 12 2C11.2114 2 10.5714 2.64 10.5714 3.42857V10.5714H3.42857C2.64 10.5714 2 11.2114 2 12C2 12.7886 2.64 13.4286 3.42857 13.4286H10.5714V20.5714C10.5714 21.36 11.2114 22 12 22C12.7886 22 13.4286 21.36 13.4286 20.5714V13.4286H20.5714C21.36 13.4286 22 12.7886 22 12C22 11.2114 21.36 10.5714 20.5714 10.5714Z"
      fill="#C08F54"
    />
  </Svg>
);
export default ProductPlus;
