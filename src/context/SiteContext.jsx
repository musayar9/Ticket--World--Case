import { createContext } from "react";

export const SiteContext = createContext()

export default function SiteContextProvider({children}){
    return (
        <SiteContext.Provider value = {{}}>
            {children}
        </SiteContext.Provider>
    )
}