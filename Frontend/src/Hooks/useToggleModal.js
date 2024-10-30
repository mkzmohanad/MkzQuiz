import { useState } from "react";

export function useToggleModal() {
    const [toggleModal , setToggleModal] = useState(false);

    function handleSetToggleModal() {
        setToggleModal((modal) => !modal);
    }

    return {toggleModal , handleSetToggleModal};
}