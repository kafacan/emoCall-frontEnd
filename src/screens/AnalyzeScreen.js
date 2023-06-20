import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import dummyContact,{getAllUsers} from '../dummyDatas/dummyContact';
import Divider from '../components/Divider';
import { Avatar,IconButton,Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';

const DATA = dummyContact



const analyzeScreen = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const [resultArray,setResultArray] = useState([])
    const [processDone,setProcessDone] = useState(false)

    const getResult = async () => {
        await fetch('http://192.168.1.24:5000/start',{
        method: 'POST',
        })
        .then(response => response.json())
        .then(json => {
            let analysis = [];
            let start = null;
            let end = null;
            let prev_emotion = null;

            for (let [second, data] of Object.entries(json)) {
                let emotion = data.dominant_emotion;
                if (start === null) {  // starting point
                    start = second;
                    prev_emotion = emotion;
                } else if (emotion !== prev_emotion) {  // emotion has changed
                    end = second - 1;
                    analysis.push(`User is ${prev_emotion} between the seconds ${start} and ${end}`);
                    start = second;
                    prev_emotion = emotion;
                }
            }

            // handle the last interval
            end = Object.keys(json).pop();
            analysis.push(`User is ${prev_emotion} between the seconds ${start} and ${end}`);

            console.log(analysis.join('\n'));
            setResultArray(analysis)
        }).then(()=> setProcessDone(true))
        .catch(error => console.error('Error:', error));
    }
    useEffect(()=>{
        getResult()
    },[])
    if(!processDone){
        return (<LoadingIndicator/>)
    } else
    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineLarge" style={{color:'grey'}}>{`Merhabalar aq`}</Text>
            <View style={{flex:1,justifyContent:'center'}}>
                {resultArray.map((item, index) => {
                    console.log(item)
                    return (
                        <View key={index} style={{flex:1}}>
                            <Text variant="headlineLarge" style={{color:'black'}}>{`${item}`}</Text>
                            <Divider lineColor={'#D3D3D3'}/>
                        </View>
                    )
                })}
            </View> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default analyzeScreen;