import { useState } from "react";

export function useToggleShowPassword() {
    const [showPassword , setShowPassword] = useState(false);
    
    function handleSetShowPassword() {
        setShowPassword((password) => !password);
    }

    return [showPassword , handleSetShowPassword]
}