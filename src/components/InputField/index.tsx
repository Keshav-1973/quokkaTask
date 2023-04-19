import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';


const InputField = (props: any) => {
    
    const getBorderColor = () => {
        if (props?.error) {
            return "red";
        }
        return "#d7dfe4"
    };

    return (
        <View style={styles.inputContainer}>
            {props.label && (
                <Text style={{ color: "black" }}>
                    {props.label}
                </Text>
            )}
            <View
                style={[
                    styles.wrapper,
                    { alignItems: props.icon ? 'center' : 'baseline' },
                    { borderColor: getBorderColor(), flexDirection: "row"},
                ]}
            >
                <TextInput
                    style={[
                        styles.textInput,
                        props.style,
                        { color: "black" },
                    ]}
                    onChangeText={props.onChange}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    onBlur={props.onBlur}
                    {...props}
                    placeholderTextColor={"#98a1a8"}
                    editable={props.editable}
                    selectTextOnFocus={props.editable}
                    onEndEditing={props.onSubmitEditing}
                    blurOnSubmit={false}
                    keyboardType={props.keyboardType}
                    secureTextEntry={props.isSecureTextEntry}
                />
            </View>
            {props.error ? (
                <Text
                    style={{ color: "red" }}
                >
                    {props.error}
                </Text>
            ) : null}
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    wrapper: {
        height: 55,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        marginTop: 5,
        backgroundColor: "#f7f8fa",
    },
    inputContainer: {

    },
    icon: {
        color: 'black',
    },
    textInput: {
        flex: 1,
        width: '100%',
    },

    error: {
        color: "red",
        paddingTop: 4,
        fontSize: 12,
    },
});
