import {StyleSheet} from "react-native";
import {customTheme} from "./CustomTheme";
const theme = customTheme
export const customStyles = StyleSheet.create({
    buttons: {
        contained:{
            container: {
                borderRadius: 16,
                height:45,
                elevation:3,
                letterSpacing: 0.25,

            },
            text: {
                fontSize: 16,
                lineHeight: 21,
                fontWeight: 'bold',
            }
        },
        outlined: {
            container: {
                borderRadius: 16,
                height:45,
                elevation:3,
                borderColor: theme.colors.primary,

            },
            text: {
                fontSize: 16,
                lineHeight: 21,
                fontWeight: 'bold',
            }
        },
    },
});