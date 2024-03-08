import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { heightScale, widthScale } from "../../styles/responsive";
const InWishListImg = (props : any) => (
  <Svg
    width={widthScale(18)}
    height={heightScale(18)}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_409_772)">
      <Path
        d="M9 17.7891C13.8541 17.7891 17.7891 13.8541 17.7891 9C17.7891 4.14594 13.8541 0.210938 9 0.210938C4.14594 0.210938 0.210938 4.14594 0.210938 9C0.210938 13.8541 4.14594 17.7891 9 17.7891Z"
        fill="#C08F54"
      />
      <Path
        d="M12.5652 10.1638C11.3277 11.3942 9.34841 13.3771 9.00037 13.7216C8.65584 13.3771 6.67654 11.3978 5.43552 10.1567C4.3281 9.04933 4.3492 7.43565 5.3617 6.43018C6.36716 5.43175 7.9949 5.43175 9.00037 6.44425C9.9988 5.43878 11.6336 5.43175 12.639 6.43018C13.6445 7.43565 13.6726 9.05284 12.5652 10.1638Z"
        fill="#251919"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_409_772">
        <Rect width={18} height={18} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default React.memo(InWishListImg);
