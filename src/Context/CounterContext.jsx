import { createContext, useState } from "react";

export let CounterContext = createContext(0)

export default function CounterContextProvider(props) {
    let [counter, setCounter] = useState(10)
    return <CounterContext.Provider value={{ counter }}>
        {props.children}
    </CounterContext.Provider>
}