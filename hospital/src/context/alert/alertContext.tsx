import { createContext } from 'react';

type AlertTypeContext = {
     alerts: any,
     setAlert :(msg: string, type: string, timeout: number) => void
}

const alertContext = createContext<AlertTypeContext>({} as AlertTypeContext);

export default alertContext;
