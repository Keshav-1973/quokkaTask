import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAppSelector } from "../../helpers/AppStore";




const Dashboard = () => {
    const userAuth = useAppSelector((state) => state.userAuth);
    return (
        <View style={styles.container}>

            <View style={{ flex: 0.3 }} >
                <Text style={styles.welcomeText}>Hi User</Text>
                <Text style={styles.welcomeTextDescription}>Email: {userAuth?.user?.email}</Text>
                <Text style={styles.welcomeTextDescription}>Welcome to your Home Screen</Text>
            </View>
            <View style={{ flex: 0.2, justifyContent: "center", }}>
                <View style={styles.weatherInfo}>
                    <View style={{ backgroundColor: "#e4e6e8", height: "80%", width: 2, alignSelf: "center" }}>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15
    },
    weatherInfo: {
        backgroundColor: "#f7f8fa",
        flex: 1,
        borderRadius: 30,
        justifyContent: "center"
    },
    welcomeTextDescription: {
        color: "black",
        fontFamily: "Montserrat-Regular",
        fontSize: 15,
        marginTop: 5
    },
    welcomeText: {
        color: "black",
        fontSize: 25,
        fontFamily: "Montserrat-SemiBold",
        marginTop: 30
    },

});

export default Dashboard;
