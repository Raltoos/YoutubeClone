/* eslint-disable react/prop-types */
import { useState } from "react";
import { UserAuthContext } from "./user-auth-context";

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);


    return (
        <UserAuthContext.Provider value={{user, setUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}