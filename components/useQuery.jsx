import { createContext, useContext, useState } from "react";


export const useQuery = () => {
    const [query, setQuery] = useState("monkeys");
    return [query, setQuery];
}