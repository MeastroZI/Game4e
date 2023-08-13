import React, { useRef, useEffect, startTransition } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Random_Colr from '../Util/Random_Colr';

export default function Box({ setPan, Id, TestTubePosition, OverLapWithTube }) {


    const box = useRef();
    const boxPos = useRef();
    const boxColr = useRef(Random_Colr()).current
    const OverapOccure = useRef();
    const pan = useRef(new Animated.ValueXY()).current;
    const AnimationPos = useRef(new Animated.ValueXY()).current;

    const tubeIndex = 0;

    OverapOccure.current = ((OverLapWithTube.OverLap) && (OverLapWithTube.Id == Id)) ? true : false;
    // console.log(OverapOccure)



    //*********Initially setting the position of the box*********** */
    const setThePosOfTheBox = () => {
        // console.log("Layout is running")
        box.current.measure((x, y, height, width, pageX, pageY) => {
            setPan({ X: pageX, Y: pageY, dx: 0, dy: 0, Height: height, Width: width }, Id);
            boxPos.current = { X: pageX, Y: pageY, dx: 0, dy: 0, Height: height, Width: width }
        });
        // console.log(boxPos.current)

    };
    //*********Initially setting the position of the box*********** */


    const settingAnimatedEvent = (_, gestureState) => {
        const { dx, dy, moveX, moveY } = gestureState;
        console.log(dx)

        const ConditionO = !OverapOccure.current
        if (!OverapOccure.current) {
            Animated.event([null, { dx: ConditionO ? pan.x : null, dy: ConditionO ? pan.y : null }], {
                useNativeDriver: false,
            })(_, gestureState);

        }



        // console.log(OverapOccure.current)
        box.current.measure((x, y, height, width, pageX, pageY) => {

            setPan({ X: pageX, Y: pageY, dx: gestureState.dx, dy: gestureState.dy, Height: height, Width: width }, Id);
            setThePosOfTheBox();


        });

    }

    const PNPpanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => { return !OverapOccure.current },
            onPanResponderMove: settingAnimatedEvent,
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        })
    ).current

    // if (OverapOccure) {
    //     PNPpanResponder.current = null;
    // }
    /************Box Under the tube Animation *************** */

    const UnderTheTubeAnimation = useRef(new Animated.ValueXY()).current
    const StartAnimation = () => {
        // console.log(boxPos.current)
        if (TestTubePosition.length != 0) {
            const Tube = TestTubePosition[0];
            const X = Tube.X - boxPos.current.X + 5;
            const Y = (Tube.Y + Tube.Height) - boxPos.current.Y - boxPos.current.Height - 7;

            // console.log(`${JSON.stringify(pan.x)} , ${JSON.stringify(pan.y)}`)

            // pan.x = 0
            // pan.y = 0
            pan.x = 0
            pan.y = 0
            // console.log(`${X} , ${Y}`)
            Animated.timing(pan, {
                toValue: { x: X, y: Y },
                duration: 1000,
                useNativeDriver: true
            }).start()

        }


    }


    if (OverapOccure.current) {
        StartAnimation()

        // console.log("Overlap done")

    }




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
                borderColor: `rgba(${boxColr.r + 60}, ${boxColr.g + 60}, ${boxColr.b + 60} , 0.7)`,
            }}
            {...PNPpanResponder.panHandlers}
        />
    );
}
