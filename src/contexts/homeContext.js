import { createContext } from 'react';
import { useContext } from 'react';

const HomeContext = createContext();


export const useHomeContext = () => {

    return useContext(HomeContext)
}

export default HomeContext