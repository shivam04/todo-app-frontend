import { createContext } from "react";

const AuthContext = createContext({
    isActive: false,
    setIsActive: () => {}
});

export default AuthContext;