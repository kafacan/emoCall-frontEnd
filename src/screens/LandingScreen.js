import { Pressable, Text, View, StyleSheet} from "react-native";
import { Button } from 'react-native-paper';
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {useTheme} from "react-native-paper";
import { ActivityIndicator } from 'react-native-paper';
import {customStyles} from "../styles/StyleSheet";
const Landing = () => {
    const navigation = useNavigation()
    const styles = customStyles
    const theme = useTheme()
    return (
        <>
            <View style={{
                flex:1,
                backgroundColor: theme.colors.primary
            }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{fontSize:64,letterSpacing:.1,color:'white'}}>EmoCall</Text>
                </View>
                <View style={{ width:'100%', alignItems: 'center', justifyContent: 'flex-start',backgroundColor:'white',borderTopStartRadius:24,borderTopEndRadius:24,rowGap:20,paddingTop:20 }}>
                    <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text style={{fontSize:32,fontWeight:'600'}}>Welcome</Text>
                        <Text style={{fontSize:16,fontWeight:'400'}}>Get started with your account</Text>
                    </View>
                    <View style={{width:'100%',padding:24,gap:12}}>
                        <Button style={styles.buttons.contained.container} contentStyle={styles.buttons.contained.container} labelStyle={styles.buttons.contained.text} buttonColor={theme.colors.primary} mode="contained" onPress={()=>navigation.navigate('Sign In')}>
                            Sign In
                        </Button>
                        <Button style={styles.buttons.contained.container} contentStyle={styles.buttons.contained.container} labelStyle={styles.buttons.contained.text} buttonColor={theme.colors.secondary} textColor={theme.colors.primary} mode="contained" onPress={()=>navigation.navigate('Sign Up')}>
                            Sign Up
                        </Button>
                    </View>
                </View>
            </View>

        </>

    );
}

export default Landing