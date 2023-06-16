import {createContext, useEffect, useState} from "react";
import { APP_NAME,ACC_NAME } from "../../VIConstants";
import {Voximplant} from 'react-native-voximplant'

export const AuthContext = createContext({
    clientState: '',
    handleClientState: (state)=>{},
    isAuthenticated: false,
    handleAuthentication: (boolean)=>{}
})

const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false) 
    const [clientState, setClientState] = useState(Voximplant.ClientState.DISCONNECTED)
    const handleClientState = (state) => {
        console.log(state);
        setClientState(state)
    }
    const handleAuthentication = (boolean) => {
        console.log(boolean);
        setIsAuthenticated(boolean)
    }
    const logout = () => {
        
    }
    const value = {
        clientState: clientState,
        handleClientState: handleClientState,
        isAuthenticated: isAuthenticated,
        handleAuthentication: handleAuthentication

    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider