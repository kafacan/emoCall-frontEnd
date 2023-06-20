/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {customTheme} from "./src/styles/CustomTheme";
import { Provider as PaperProvider } from 'react-native-paper';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ContactScreen from "./src/screens/ContactScreen";
import CallScreen from './src/screens/CallScreen';
import LoadingIndicator from './src/components/LoadingIndicator';
import React, {useEffect,useContext, useState} from 'react';
import { AuthContext } from "./src/storage/AuthContext";
import AuthContextProvider from "./src/storage/AuthContext";
import {
  StyleSheet,
} from 'react-native';
import {Voximplant} from 'react-native-voximplant'
import IncomingCallScreen from './src/screens/IncomingCallScreen';
import { useNavigation } from '@react-navigation/core';
import OngoingCallScreen from './src/screens/OngoingCallScreen';
import analyzeScreen from './src/screens/AnalyzeScreen';

const theme = customTheme
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const voximplant = Voximplant.getInstance();

function LandingRoutes() {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown:false}} />
          <Stack.Screen name={'Sign In'} component={LoginScreen} />
          <Stack.Screen name={'Sign Up'} component={SignUpScreen} />
      </Stack.Navigator>
  );
}
function HomeRoutes() {
  return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
          {/* <Tab.Screen name="Home" component={TwilioVideoCall} options={{tabBarIcon: ({focused,size,color}) => (<FontAwesome name={'home'} size={size} color={color} />) }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: ({size,color}) => (<FontAwesome name={'gear'} size={size} color={color} />) }}/>
          <Tab.Screen name="Account" component={AccountScreen} options={{tabBarIcon: ({size,color}) => (<FontAwesome name={'user'} size={size} color={color} />) }}/>
           */}<Tab.Screen name="Contact" component={ContactScreen} options={{tabBarIcon: ({size,color}) => (<FontAwesome name={'phone'} size={size} color={color} />) }}/>
          
      </Tab.Navigator>
  );
}
function UserRoutes() {
  const navigation = useNavigation()
  useEffect(()=>{
      voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
        navigation.navigate('CallingRoutes', { 
          screen: 'IncomingCallScreen',
          params: {call: incomingCallEvent.call}
      })})
      return ()=>{voximplant.off(Voximplant.ClientEvents.IncomingCall)}
  },[])
  
  return (
    <Stack.Navigator>
      {<Stack.Screen name="HomeRoutes" component={HomeRoutes} options={{headerShown:false}} />}
      <Stack.Screen name="CallingRoutes" component={CallingRoutes} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

function CallingRoutes() {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Call" component={CallScreen} options={{headerShown:false}} />
          <Stack.Screen name="IncomingCallScreen" component={IncomingCallScreen} options={{headerShown:false}} />
          <Stack.Screen name="OngoingCallScreen" component={OngoingCallScreen} options={{headerShown:false}} />
          <Stack.Screen name="AnalyzeScreen" component={analyzeScreen} options={{headerShown:false}} />
      </Stack.Navigator>
  );
}

function Navigation() {
  
  const authCtx = useContext(AuthContext)
  useEffect(()=>{
    const connectToVI = async () => { //connects to Voximplant Client
      let state = await voximplant.getClientState()
      if(state === Voximplant.ClientState.DISCONNECTED) {  
          try {
              await voximplant.connect()
              authCtx.handleClientState(Voximplant.ClientState.CONNECTED)
          } catch (e) {console.log('merhaba',e.code)}
      } else if(state === Voximplant.ClientState.LOGGED_IN){
          authCtx.handleAuthentication(true)
          authCtx.handleClientState(Voximplant.ClientState.LOGGED_IN)
        } else if(state === Voximplant.ClientState.CONNECTED){
            authCtx.handleClientState(Voximplant.ClientState.CONNECTED)
            authCtx.handleAuthentication(false)
          }
  }
  connectToVI()
  },[])
  if(authCtx.clientState != Voximplant.ClientState.CONNECTED && authCtx.clientState != Voximplant.ClientState.LOGGED_IN ){
    console.log(authCtx.clientState)
    return (<LoadingIndicator/>)
  }
  return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <LandingRoutes/>}
            {authCtx.isAuthenticated  && <UserRoutes/>}
        </NavigationContainer>
  );
}

const App = () => {

  return (
      <PaperProvider theme={theme} settings={{
        icon: props => <FontAwesome {...props} />,
      }}>
          <AuthContextProvider>
              <Navigation/>
          </AuthContextProvider>
      </PaperProvider>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
