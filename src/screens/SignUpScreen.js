import React, { useEffect} from "react";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import OtherSignInMethods from "../components/OtherSignInMethods";
import RegisterForm from "../components/RegisterForm";
import {Button, Snackbar} from "react-native-paper";
import {customTheme as theme} from "../styles/CustomTheme";
import {customStyles as styles} from "../styles/StyleSheet";
import LoadingIndicator from "../components/LoadingIndicator";

const SignUpScreen = () => {
    const navigation = useNavigation()
    const [name,setName] = React.useState()
    const [email,setEmail] = React.useState()
    const [password,setPassword] = React.useState()
    const [confirmPassword,setConfirmPassword] = React.useState()

    //************** Snackbar States ****************************
    const [snackbarVisible,setSnackbarVisible] = React.useState(false)
    const [errorMessage,setErrorMessage] = React.useState('')
    const [isLoading,setIsLoading] = React.useState(false)

    useEffect(()=>{
        
    })
    const handleSignUp = () => {

        console.log('asdf')
    }
    if(isLoading){
        return <LoadingIndicator/>
    }
    return <>
        <View style={{flex:1,alignItems: 'center', justifyContent: 'flex-start'}}>
            <View style={{flex:1,width:'90%',paddingTop:'5%',rowGap:16}}>
                <View style={{rowGap:16}}>
                    <RegisterForm confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSignUp={handleSignUp}/>
                </View>
                <View style={{marginTop:40,rowGap:16}}>
                    <OtherSignInMethods/>
                </View>
                <View style={{flex:1,justifyContent:'flex-end',rowGap:8,marginBottom:32}}>
                    <Text style={{color:'dimgrey',textAlign:'center'}}>Already have an account?</Text>
                    <Button style={styles.buttons.outlined.container} textColor={theme.colors.primary} mode="outlined" onPress={()=>{navigation.navigate('Sign In')}}>
                        Sign In
                    </Button>
                </View>
            </View>
            <Snackbar style={{backgroundColor:theme.colors.error}} visible={snackbarVisible} onDismiss={()=>setSnackbarVisible(false)} onIconPress={()=>setSnackbarVisible(false)} duration={3000}>{errorMessage}</Snackbar>
        </View>
    </>
}

export default SignUpScreen
