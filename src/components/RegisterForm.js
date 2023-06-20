import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from 'react';
import {Button, useTheme} from "react-native-paper";
import Divider from "./Divider";
import {customStyles} from "../styles/StyleSheet";


const RegisterForm = ({confirmPassword,setConfirmPassword,name,setName,email,password,setEmail,setPassword,handleSignUp}) => {
    const styles = customStyles
    const theme = useTheme()
    return (
        <>
            <View style={{width:'100%',alignItems: 'center', justifyContent: 'center',backgroundColor:'white',borderRadius:8}}>
                <View style={{alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                    <Text style={{color: 'black',flex:0.3, fontSize:16, margin:8}}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={(value) => {setName(value)}}
                        placeholder={'full nameasldfansdfkn'}
                        style={{flex:1, height: 44, padding: 10}}
                    />
                </View>
                <View style={{width:'90%'}}>
                    <Divider lineColor={theme.colors.secondary} />
                </View>
                <View style={{color: 'black',alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                    <Text style={{color: 'black',flex:0.3, fontSize:16, margin:8}}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(value) => {setEmail(value)}}
                        placeholder={'user@example.com'}
                        style={{flex:1, height: 44, padding: 10}}
                    />
                </View>
                <View style={{width:'90%'}}>
                    <Divider lineColor={theme.colors.secondary} />
                </View>
                <View style={{color: 'black', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                    <Text style={{color: 'black', flex:0.3, fontSize:16, margin:8}}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={(value) => {setPassword(value)}}
                        placeholder={'enter your password'}
                        style={{flex:1, height: 44, padding: 10,}}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{width:'90%'}}>
                    <Divider lineColor={theme.colors.secondary} />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                    <Text style={{color: 'black', flex:0.3, fontSize:16, margin:8}}>Password</Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={(value) => {setConfirmPassword(value)}}
                        placeholder={'confirm your password'}
                        style={{flex:1, height: 44, padding: 10,}}
                        clearButtonMode={'while-editing'}
                    />
                </View>
            </View>
            <View style={{rowGap:8}}>
                <Button style={styles.buttons.contained.container} mode="contained" onPress={handleSignUp}>
                    Sign Up
                </Button>
            </View>

        </>
    )
}
export default RegisterForm