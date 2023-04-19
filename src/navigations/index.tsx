import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';

const MainNavigator = () => {
    return (
        <NavigationContainer
            fallback={<Text>Loading...</Text>}
        >
            <AuthStack />
        </NavigationContainer>
    );
};

export default MainNavigator;
