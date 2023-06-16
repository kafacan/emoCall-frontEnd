import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from 'react';
import {Button, useTheme} from "react-native-paper";
import Divider from "./Divider";
import {customStyles} from "../styles/StyleSheet";


const LoginForm = ({email,password,setEmail,setPassword,handleSignIn}) => {
    const theme = useTheme()
    const styles = customStyles
    return (
        <>
            <View style={{width:'100%',alignItems: 'center', justifyContent: 'center',backgroundColor:'white',borderRadius:8}}>
                <View style={{alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                    <Text style={{fontSize:16, margin:8, flex:0.3,fontWeight:'500',color:'black'}}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(email) => {setEmail(email)}}
                        placeholder={'user@example.com'}
                        style={{flex:1, height: 44, padding: 10,color:'black'}}
                    />

                </View>
                <View style={{width:'90%'}}>
                    <Divider lineColor={theme.colors.secondary} />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                    <Text style={{flex:0.3, fontSize:16, margin:8,fontWeight:'500',color:'black'}}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={(password) => {setPassword(password)}}
                        placeholder={'enter your password'}
                        secureTextEntry
                        style={{flex:1, height: 44, padding: 10,color:'black'}}
                        clearButtonMode={'while-editing'}
                    />
                </View>
            </View>
            <View style={{rowGap:8}}>
                <Button style={styles.buttons.contained.container} contentStyle={styles.buttons.contained.container} labelStyle={styles.buttons.contained.text} buttonColor={theme.colors.primary} mode="contained" onPress={handleSignIn}>
                    Sign In
                </Button>
                <Pressable>
                    <Text style={{color: 'steelblue'}}>forgot password?</Text>
                </Pressable>
            </View>

        </>
    )
}


export default LoginForm