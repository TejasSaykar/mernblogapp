// import { useState, useEffect, createContext, useContext } from "react";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState([]);

//     useEffect(() => {
//         const data = localStorage.getItem("user");
//         if (data) {
//             const parseData = JSON.parse(data);
//             setAuth(parseData)
//         }
//         console.log(auth)
//     }, [])

//     return (
//         <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
//     )
// }

// const useAuth = () => useContext(AuthContext);
// export { useAuth, AuthProvider };


import { useState, useEffect, createContext, useContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth(parsedData);
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };