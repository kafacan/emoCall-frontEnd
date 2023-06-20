import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import CallActionBox from '../components/CallActionBox';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';
import { useTheme,Avatar,Text } from 'react-native-paper';
import RecordScreen from 'react-native-record-screen';
import storage from '@react-native-firebase/storage'
import LoadingIndicator from "../components/LoadingIndicator";
import uuid from 'react-native-uuid';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const OngoingCallScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  const theme = useTheme()
  const navigation = useNavigation();
  const route = useRoute();

  const {user, call: incomingCall, isIncomingCall} = route?.params;
  const voximplant = Voximplant.getInstance();

  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  const goBack = () => {
    navigation.pop();
  };
 
  async function uploadToGCS(path) {
    console.log('entered to function')
    let id = uuid.v4()
    const ref = storage().ref(`${user.name}_${id}.mp4`)
    const task = ref.putFile(path);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
      navigation.navigate('AnalyzeScreen')
    });

  }
  


  useEffect(()=> {
          const uploadToFirebase= async () => {
            const res = await RecordScreen.stopRecording().catch((error) =>
            console.warn('error:',error)
            );
            if (res) {
              console.log(res.result.outputURL)
              uploadToGCS(res.result.outputURL);
            }
          }
          if(callStatus === 'Connected'){
            if(user){
              const res = RecordScreen.startRecording().catch((error) => console.error(error));
               if(res){
                   console.log(res)
               }
            }
          }
          if(callStatus==='Disconnected'){
            if(user){
              uploadToFirebase()
            } else {
              navigation.navigate('HomeRoutes')
            }
          }
  },[callStatus])

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };

    if (Platform.OS === 'android') {
      getPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }

    const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    const makeCall = async () => {
      call.current = await voximplant.call(user.name, callSettings);
      subscribeToCallEvents();
    };

    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
    };

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showError(callEvent.reason);
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling');
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected');
      });
      
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent =>{
          setCallStatus('Disconnected')
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
      
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };

    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          console.log(endpointEvent.videoStream)
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    };

    const showError = reason => {
      Alert.alert('Call failed', `Reason: ${reason}`, [
        {
          text: 'Ok',
          onPress: navigation.navigate('HomeRoutes'),
        },
      ]);
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);

  const onHangupPress = async () => {
    call.current.hangup();
  };
  if(callStatus==='Disconnected'){
    return (<LoadingIndicator/>)
  }
  if(callStatus==='Ringing' || callStatus==='Calling' ){
    return (
    <View style={{
      flex:1,
      backgroundColor: theme.colors.primary,
      alignItems:'center'}}
      > 
      <View style={{
          marginTop:100,
          alignItems:'center'}}
      >
          <Avatar.Image size={128} source={user?.photoUrl} />
          <Text variant="headlineLarge" style={{color:'white'}}>{callStatus} {user?.name}... </Text>    
      </View>               
      <View style={{
          flexDirection:"row",
          alignItems:'flex-end',
          flex:1}}
      >   
          <CallActionBox onHangupPress={onHangupPress} />
      </View>  
  </View>)
  }
  return (
    <View style={{flex:2,minWidth:'100%'}}>
      <View style={{flex:1,backgroundColor:'transparent'}}>
        <Voximplant.VideoView
          videoStreamId={remoteVideoStreamId}
          style={{...StyleSheet.absoluteFillObject, zIndex: 1,minWidth:'100%'}}
          scaleType={Voximplant.RenderScaleType.SCALE_FILL}
        />
      </View>
      <View style={{flex:1,width:'100%'}}>
        <Voximplant.VideoView
          videoStreamId={localVideoStreamId}
          style={{...StyleSheet.absoluteFillObject, zIndex: 1}}
          scaleType={Voximplant.RenderScaleType.SCALE_FILL}
        />
      </View>
      <CallActionBox onHangupPress={onHangupPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex:1
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  localVideoWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    zIndex: 1,
  },
  remoteVideo: {
    backgroundColor: 'blue',
    borderRadius: 10,
    width: '100%',
    height:'100%'
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 10,
  },
});

export default OngoingCallScreen;