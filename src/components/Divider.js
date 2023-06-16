import {Text, View} from "react-native";

const Divider = ({text,textColor,lineColor}) => {
    return <View style={{flexDirection:'row'}}>
        <View style={{height: 1,flex:1, backgroundColor: lineColor ? lineColor : 'darkgrey', alignSelf:'center'}}/>
        {text ? <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 16, color: textColor ? textColor : 'dimgrey'}}>{text}</Text> : null}
        <View style={{height: 1, flex:1, backgroundColor: lineColor ? lineColor : 'darkgrey', alignSelf:'center'}}/>
    </View>
}
export default Divider