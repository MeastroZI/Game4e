import { React, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestTube = forwardRef((props, ref) => {
    return (
        <View style={styles.testTube} ref={ref} UniqueId={props.Id} onLayout={props.setTestTubePos}>
            {/* Component content */}
        </View>
    );
});

export default TestTube;

const styles = StyleSheet.create({
    testTube: {
        height: 300,
        width: 80,
        backgroundColor: "#42A32733",
        borderWidth: 2,
        borderBottomEndRadius: 15,
        borderBottomLeftRadius: 15,
    }
});
