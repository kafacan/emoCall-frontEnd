import * as React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import {View} from "react-native";

const LoadingIndicator = () => {
    const theme = useTheme()
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size='large' animating={true} color={theme.colors.primary}/>
        </View>

    );
}
export default LoadingIndicator;