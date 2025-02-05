import { createContext ,useState,useEffect,useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Context = createContext();

export const ContextProvider = ({children}) => {

    const [hello, setHello] = useState('hello');

    const value = {

        hello,
        setHello
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export const useBarcelonaContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useBarcelonaContext must be used within a ContextProvider');
    }
    return context;
}