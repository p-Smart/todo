import { createContext } from 'react';
import { useContext } from 'react';

const GlobalContext = createContext();


export const useGlobalContext = () => {

    return useContext(GlobalContext)
}

export default GlobalContext