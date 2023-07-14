import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, PanResponder, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TestTube from '../Components/TestTube';
import Box from '../Components/Box';
import CheckOverLape from '../Util/CheckOverLape';

export default function Dashboard() {
    const testTube1 = useRef()
    const testTube2 = useRef()
    const testTube3 = useRef()
    const testTubePos = useRef([])
    const pansArr = useRef([])



    useEffect(() => {

    })





    function setTestTubePos() {
        testTube1.current.measure((x, y, width, height, pageX, pageY) => {

            testTubePos.current[0] = { X: pageX, Y: pageY }

        });

        testTube2.current.measure((x, y, width, height, pageX, pageY) => {
            testTubePos.current[1] = { X: pageX, Y: pageY }
        });

        testTube3.current.measure((x, y, width, height, pageX, pageY) => {
            // console.log({ x, y, width, height, pageX, pageY })
            testTubePos.current[2] = { X: pageX, Y: pageY }
            // console.log(testTubePos.current)
        });

    }


    const numberOfBox = 3;



    const GettingPan = (pan, id) => {


        const updatedArr = [...pansArr.current]
        updatedArr[id] = pan;
        pansArr.current = updatedArr;




    }



    const renderBoxes = () => {
        return Array.from({ length: numberOfBox }, (_, index) => (
            <Box Id={index} key={index} setPan={GettingPan} />
        ))
    }


    return (
        <View style={styles.Container}>
            <LinearGradient style={{ height: "100%", width: "100%" }} colors={['#eeaeca', '#94bbe9']}>

                <View style={styles.BoxContainer}>
                    {renderBoxes()}
                </View>

                <View style={styles.TestTubeContainer}>
                    <TestTube ref={testTube1} Id={0} />
                    <TestTube ref={testTube2} Id={1} />
                    <TestTube ref={testTube3} Id={2} setTestTubePos={setTestTubePos} />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        height: "100%",
        width: "100%",
    },
    BoxContainer: {
        width: "100%",
        height: "40%",
        top: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignContent: 'center',
        backgroundColor: ' grey'
    },
    TestTubeContainer: {
        height: '40%',
        width: "100%",
        position: 'absolute',
        bottom: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});
