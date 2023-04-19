import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from "../../../components/CustomButton";
import InputField from '../../../components/InputField';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../helpers/AppStore';
import { UserAuthActions } from './redux';


const initialValues = {
  Email: "",
  Password: ""
};


const validate = Yup.object().shape({
  Email: Yup.string().required('Email is Required').email(),
  Password: Yup.string().required('Password is Required').min(8).matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    "Must Contain minimum 8 characters, at least one uppercase letter and one number"
  )
});


const LoginScreen = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: { Email: string; Password: string }) => {
    setLoading(true)
    if (data.Email && data.Password) {
      const obj = {
        email: data.Email,
        password: data.Password
      }
      const res = await dispatch(UserAuthActions.loginViaEmailandPass(obj))
      if (res.payload === "auth/user-not-found") {
        const res = await dispatch(UserAuthActions.registreViaEmailandPass(obj))
        if (res?.payload?.user?._auth._authResult) {
          await dispatch(UserAuthActions.resgister(res.payload))
        }
      } else if (res.payload) {
        await dispatch(UserAuthActions.logIn(res.payload))
      }
    }
    setLoading(false)
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 70 }}>
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={styles.text}>Hey,{"\n"}Login Now</Text>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validate}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            return (<View style={{ width: "100%" }}>
              <InputField
                label={'Email'}
                placeholder="Email"
                onChange={handleChange('Email')}
                onBlur={handleBlur('Email')}
                value={values.Email}
                error={errors.Email}
                touched={touched.Email}
              />
              <InputField
                label={'Password'}
                placeholder="Password"
                onChange={handleChange('Password')}
                onBlur={handleBlur('Password')}
                value={values.Password}
                error={errors.Password}
                touched={touched.Password}
                isSecureTextEntry={true}
              />
              <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 15 }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#98a0a7',
                  fontFamily: 'Montserrat-Medium',
                  marginLeft: 5,
                  flexShrink: 1
                }}>By logging in, I accept the terms & conditions of the platform
                </Text>
              </View>
              <CustomButton
                title={'Sign In/Sign Up'}
                onPress={handleSubmit}
                customStyles={{ marginTop: 10 }}
                disabled={!toggleCheckBox}
                loading={loading}
              />
            </View>
            )
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    fontFamily: "Montserrat-SemiBold"
  },
  forgotButton: {
    marginVertical: 10
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: "#98a0a7"
  }
});
