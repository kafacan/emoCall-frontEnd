import {View} from "react-native";
import * as React from 'react';
import CircleIconButton from "./CircleIconButton";
import Divider from "./Divider";


const OtherSignInMethods = () => {

    return (
        <>
            <Divider text={'Or Continue With'}/>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',columnGap:16}}>
                <CircleIconButton iconName={'facebook-square'} bgColor={'#1877f2'}/>
                <CircleIconButton iconName={'google'} bgColor={'#db4437'} />
                <CircleIconButton iconName={'apple'} bgColor={'black'} />
            </View>
        </>
    )
}
export default OtherSignInMethods