import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import dummyContact,{getAllUsers} from '../dummyDatas/dummyContact';
import Divider from '../components/Divider';
import { Avatar,IconButton,Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RecordScreen from 'react-native-record-screen';
import storage from '@react-native-firebase/storage'

const DATA = dummyContact



const ContactScreen = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const [searchTerm,setSearchTerm] = useState('')
    const [stateX,setStateX] = useState(false)

    const [filteredContact,setFilteredContact] = useState(dummyContact)

    useEffect(()=>{
        let newFilteredContact = dummyContact.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredContact(newFilteredContact)
    },[searchTerm])

    const renderItem = ({item}) => { 
    
        return(
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,flex:1 }}>
            
            <View> 
                <Avatar.Image size={48} source={item.photoUrl} />
            </View> 
            <View > 
                <Text style={{ marginLeft: 10, fontSize: 16 }}>{item.name}</Text>
            </View> 
            <View style={{flex:1,alignItems:'flex-end',paddingRight:16}}> 
                <IconButton
                    icon="video-camera"
                    iconColor={'steelblue'}
                    size={28}
                    onPress={() => navigation.navigate('CallingRoutes', { 
                        screen: 'OngoingCallScreen',
                        params: {user: item}
                    })} 
                    
                />
            </View>    
        </View>
      );}
    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding:16,paddingBottom:4,gap:8}}>
                <Text variant="headlineLarge" style={{color:'grey'}}>Contacts</Text>
                <TextInput value={searchTerm} onChangeText={setSearchTerm} activeOutlineColor={'grey'} placeholder='Search' mode='outlined' left={<TextInput.Icon icon="search" color={ () => 'grey'} />}></TextInput>
                <Divider lineColor={'#D3D3D3'}/>
            </View> 
            
            <FlatList
                data={filteredContact}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<Divider lineColor={'#D3D3D3'}/>}
            />
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

export default ContactScreen;