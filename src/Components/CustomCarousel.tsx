import React from 'react';
import { View } from 'react-native';
import { images } from '../Content/resources';
import Carousel from 'react-native-reanimated-carousel';
import { heightScale, mdblScreenWidth, moderateScale, strPrimaryColor, widthScale } from '../styles/responsive';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

export function CustomCarousel({ productImages }: { productImages: string[] }) {
    const colors = [
        strPrimaryColor,
        strPrimaryColor,
        strPrimaryColor,
    ];
    const progressValue = useSharedValue<number>(0);

    const imageSources = productImages;

    const PaginationItem: React.FC<{
        index: number
        length: number
        animValue: Animated.SharedValue<number>
        isRotate?: boolean
    }> = (props) => {
        const { animValue, index, length, isRotate } = props;
        const width = 10;

        const animStyle = useAnimatedStyle(() => {
            let inputRange = [index - 1, index, index + 1];
            let outputRange = [-width, 0, width];

            if (index === 0 && animValue?.value > length - 1) {
                inputRange = [length - 1, length, length + 1];
                outputRange = [-width, 0, width];
            }

            return {
                transform: [
                    {
                        translateX: interpolate(
                            animValue?.value,
                            inputRange,
                            outputRange,
                        ),
                    },
                ],
            };
        }, [animValue, index, length]);

        return (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: strPrimaryColor,
                    width,
                    height: width,
                    borderRadius: 50,
                    overflow: "hidden",
                    margin: moderateScale(10)
                }}
            >
                <Animated.View
                    style={[
                        {
                            borderRadius: 50,
                            backgroundColor: strPrimaryColor,
                            flex: 1,
                        },
                        animStyle,
                    ]}
                />
            </View>
        );
    };
    return (
        <View>
            <Carousel
                width={mdblScreenWidth}
                height={heightScale(290)}
                style={{ justifyContent: 'space-between' }}
                loop={productImages.length > 0 ? false : true}
                autoPlay={false}
                data={imageSources} // Pass the array of image sources
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            height: heightScale(290),
                            width: widthScale(333),
                            alignSelf: 'center',
                            borderRadius: moderateScale(30),
                        }}
                    >
                        <FastImage source={{ uri: item }} style={{ width: '100%', height: '100%', borderRadius: 30 }} />
                    </View>
                )}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
            />
            {!!progressValue && (
                <View
                    style={
                        {
                            flexDirection: "row",
                            justifyContent: "center",
                            width: widthScale(10),
                            alignSelf: "center",
                        }
                    }
                >
                    {productImages.map((backgroundColor, index) => {
                        return (
                            <PaginationItem
                                animValue={progressValue}
                                index={index}
                                key={index}
                                length={colors.length}
                            />
                        );
                    })}
                </View>
            )}
        </View>
    );
}
