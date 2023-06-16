import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from "react-native";
import {IconButton, useTheme} from "react-native-paper";
import * as React from "react";

const CircleIconButton = ({iconName,bgColor,iconColor}) => {
    const theme = useTheme()
    return <>
        <IconButton
            iconColor={iconColor ? iconColor : 'white'}
            style={{backgroundColor: bgColor ? bgColor : theme.colors.primary}}
            size={32}
            icon={({size,color})=>(
                <FontAwesome name={iconName} size={size} color={color} />
            )}
            onPress={() => console.log('Pressed')}/>
    </>
}
export default  CircleIconButton