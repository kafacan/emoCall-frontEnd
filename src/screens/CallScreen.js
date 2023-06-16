import { Alert, PermissionsAndroid, Platform, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, useTheme,Avatar,IconButton} from "react-native-paper";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../storage/AuthContext";
import {Voximplant} from 'react-native-voximplant'
const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA
]

const CallScreen = ({user,callStatus}) => {
    const theme = useTheme()
    const authCtx = useContext(AuthContext)
    const userToCall = user

  

    return (
        <>
            <View style={{
                flex:1,
                backgroundColor: theme.colors.primary,
                alignItems:'center'}}
                > 
                <View style={{
                    marginTop:100,
                    alignItems:'center'}}
                >
                    <Avatar.Image size={128} source={userToCall.photoUrl} />
                    <Text variant="headlineLarge" style={{color:'white'}}>{callStatus}... {userToCall.name}...</Text>    
                </View>               
                <View style={{
                    flexDirection:"row",
                    alignItems:'flex-end',
                    flex:1}}
                >   
            
                </View>  

            </View>

        </>

    );
}

export default CallScreen