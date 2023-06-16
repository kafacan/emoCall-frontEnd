import { MD3LightTheme as DefaultTheme} from 'react-native-paper';
import configureFonts from "react-native-paper/src/styles/fonts";
const fontConfig = {
    letterSpacing:0.15
}
export const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'steelblue',
        secondary: 'whitesmoke',
    },
    fonts:configureFonts({config:fontConfig})
};