import React, { useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Random_Colr from '../Util/Random_Colr';

export default function Box({ setPan, Id, IsBoxBlock }) {
    const box = useRef();
    const boxColr = useRef(Random_Colr())
    const CollisionNotOccur = (!(IsBoxBlock.Blocked && IsBoxBlock.Id == Id));
    // console.log(IsBoxBlock)


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
        // console.log(CollisionNotOccur)
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
                backgroundColor: boxColr.current,
                borderRadius: 15,
                transform: [
                    { translateX: pan.x },
                    { translateY: pan.y },
                ],
            }}
            {...PNPpanResponder.panHandlers}
        />
    );
}
