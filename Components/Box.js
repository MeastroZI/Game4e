import React, { useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Random_Colr from '../Util/Random_Colr';

export default function Box({ setPan, Id }) {
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

        // console.log(moveX)

        Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false,
        })(_, gestureState);
        // setPan({ X: gestureState.moveX, Y: gestureState.moveY, dx: gestureState.dx, dy: gestureState.dy }, Id);
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
