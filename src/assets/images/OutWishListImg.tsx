import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { heightScale, widthScale } from "../../styles/responsive";
const OutWishListImg = (props: any) => (
    <Svg
        width={widthScale(18)}
        height={heightScale(18)}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_409_782)">
            <Path
                d="M9 17.7891C13.8541 17.7891 17.7891 13.8541 17.7891 9C17.7891 4.14594 13.8541 0.210938 9 0.210938C4.14594 0.210938 0.210938 4.14594 0.210938 9C0.210938 13.8541 4.14594 17.7891 9 17.7891Z"
                fill="#C08F54"
            />
            <Path
                d="M9.77144 12.2454C9.47066 12.546 9.20407 12.8125 9.00105 13.0152L5.78908 9.80319C4.8696 8.88371 4.90567 7.5877 5.71401 6.78498C6.52408 5.98056 7.83524 5.98056 8.64558 6.79657L9.00038 7.15384L9.35516 6.79656C10.1591 5.98691 11.4769 5.98144 12.2861 6.78438C13.0895 7.58843 13.1298 8.88843 12.2119 9.80998C11.4911 10.5266 10.5242 11.4931 9.77144 12.2454Z"
                stroke="#251919"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_409_782">
                <Rect width={18} height={18} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default React.memo(OutWishListImg);
