import React, {useContext, useEffect} from "react";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import OtherSignInMethods from "../components/OtherSignInMethods";
import LoginForm from "../components/LoginForm";
import {Button, Snackbar, useTheme} from "react-native-paper";
import {customStyles} from "../styles/StyleSheet";
import LoadingIndicator from "../components/LoadingIndicator";
import { APP_NAME,ACC_NAME } from "../../VIConstants";
import { AuthContext } from "../storage/AuthContext";
import {Voximplant} from 'react-native-voximplant';

const styles = customStyles
const LoginScreen = () => {
    const navigation = useNavigation()
    const authCtx = useContext(AuthContext)
    const theme = useTheme()
    const voximplant = Voximplant.getInstance()
    const [username,setUserName] = React.useState()
    const [password,setPassword] = React.useState()
    const [snackbarVisible,setSnackbarVisible] = React.useState(false)
    const [errorMessage,setErrorMessage] = React.useState('')
    const [isLoading,setIsLoading] = React.useState(false)
    
    const handleSignIn = async () => {
        const authenticate = async (username,password) => { //Logins to Voximplant
            try {
                const fqUserName = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`
                await voximplant.login(fqUserName, password)
                authCtx.handleClientState(Voximplant.ClientState.LOGGED_IN)
                authCtx.handleAuthentication(true)
            } catch (e) {
                console.log(e.name, 'error code: ', e.code)
            }
        }
        authenticate(username,password)
    }
    if(isLoading){
        return <LoadingIndicator/>
    }
    return <>
        <View style={{flex:1,alignItems: 'center', justifyContent: 'flex-start'}}>
            <View style={{flex:1,width:'90%',paddingTop:'5%',rowGap:40}}>
                <View style={{rowGap:16}}>
                    <LoginForm email={username} setEmail={setUserName} password={password} setPassword={setPassword} handleSignIn={handleSignIn}/>
                </View>
                <View style={{marginTop:40,rowGap:16}}>
                    <OtherSignInMethods/>
                </View>
                <View style={{flex:1,justifyContent:'flex-end',rowGap:8,marginBottom:32}}>
                    <Text style={{color:'dimgrey',textAlign:'center'}}>Don't have an account?</Text>
                    <Button style={styles.buttons.outlined.container} textColor={theme.colors.primary} contentStyle={styles.buttons.outlined.container} labelStyle={styles.buttons.outlined.text} mode="outlined" onPress={async ()=>{navigation.navigate('Sign Up')}}>
                        Register
                    </Button>
                </View>
            </View>
            <Snackbar style={{backgroundColor:theme.colors.error}} visible={snackbarVisible} onDismiss={()=>setSnackbarVisible(false)} onIconPress={()=>setSnackbarVisible(false)} >{errorMessage}</Snackbar>
        </View>
    </>
}


export default LoginScreen