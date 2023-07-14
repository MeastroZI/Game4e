import React, { useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Random_Colr from '../Util/Random_Colr';

export default function Box({ setPan, Id, TestTubePosition }) {

    // console.log(TestRef)

    const box = useRef();
    const boxColr = useRef(Random_Colr()).current
    const setThePosOfTheBox = () => {
        // console.log("Layout is running")
        box.current.measure((x, y, height, width, pageX, pageY) => {
            setPan({ X: pageX, Y: pageY, dx: 0, dy: 0, Height: height, Width: width }, Id);
        });
    };
    const pan = useRef(new Animated.ValueXY()).current;
    const settingAnimatedEvent = (_, gestureState) => {
        const { dx, dy, moveX, moveY } = gestureState;
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false,
        })(_, gestureState);

        box.current.measure((x, y, height, width, pageX, pageY) => {
            setPan({ X: pageX, Y: pageY, dx: gestureState.dx, dy: gestureState.dy, Height: height, Width: width }, Id);
        });
    }

    const PNPpanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: settingAnimatedEvent,
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        })
    ).current

    // const UnderTheTubeAnimation =  useRef(new Animated.ValueXY()).current
    // const StartAnimation = () => {
    //     const X = TestTubePosition[0].X + (TestTubePosition[0].Width / 2)
    //     const Y = TestTubePosition[0].Y + TestTubePosition[0].Height
    //     Animated.timing(pan, {
    //         toValue: { x: X, y: Y },
    //         duration: 1000,
    //         useNativeDriver: true
    //     }).start()

    // }
    // if (Id == 0) {
    //     StartAnimation()

    // }


    return (
        <Animated.View
            onLayout={setThePosOfTheBox}
            ref={box}
            style={{
                width: 70,
                height: 70,
                backgroundColor: `rgb(${boxColr.r}, ${boxColr.g}, ${boxColr.b})`,
                borderRadius: 15,
                transform: [
                    { translateX: pan.x },
                    { translateY: pan.y },
                ],
                borderWidth: 4,
                borderColor: `rgba(${boxColr.r + 60}, ${boxColr.g + 60}, ${boxColr.b + 60} , 0.7)`
            }}
            {...PNPpanResponder.panHandlers}
        />
    );
}
