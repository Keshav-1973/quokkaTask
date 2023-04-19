import * as React from 'react';
import { Text, View } from 'react-native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteNames } from './RouteNames';
import { Dashboard, LoginScreen } from '../screens';
import { useAppDispatch, useAppSelector } from '../helpers/AppStore';
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { UserAuthActions } from '../screens/Auth/Login/redux';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.userAuth.isLoggedIn);

    function CustomDrawerContent(props: any) {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle={{
                flex: 1,
                justifyContent: "space-between"
            }}>
                <View style={{ flex: 0.9 }}>
                    <DrawerItemList {...props} />
                    <DrawerItem style={{ backgroundColor: "#c7bfbf" }} label="LogOut" onPress={() => {
                        dispatch(UserAuthActions.logOut())
                    }} />
                </View>
                <View style={{ alignItems: "center", flex: 0.1, justifyContent: "space-around" }}>
                    <Text>
                        Version 1.0.0
                    </Text>
                </View>
            </DrawerContentScrollView>
        );
    }

    return (
        !isLoggedIn ? (
            <>
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name={RouteNames.LOGIN} component={LoginScreen} />
                </Stack.Navigator>
            </>
        ) :
            (
                <>
                    <Drawer.Navigator
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                    >
                        <Drawer.Screen name={RouteNames.DASHBOARD} component={Dashboard} />
                    </Drawer.Navigator>
                </>
            )
    );
};

export default AuthStack;
