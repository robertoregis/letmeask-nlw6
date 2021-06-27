import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// este hook compartilha dados desse contexto
export function useAuth() {
    const value = useContext(AuthContext);
    return value;
}