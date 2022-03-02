import { setApiToken } from "../hooks/api"
import React, { useEffect, useState } from "react"
import cookie from "js-cookie"
import { useRouter } from "next/router"

type UserType = any
type AuthContextType = {
    isLoggedIn: boolean
    user: UserType
    token?: string
    login: (token: string) => void
    logout: () => void
    updateUser: (user: any) => void
}

export const initialUserState = {
    username: undefined,
    email: undefined,
    _id: undefined,
    created_at: undefined,
    updated_at: undefined,
    is_email_verfied: false,
}

export const AuthContext = React.createContext<AuthContextType>({
    isLoggedIn: false,
    user: initialUserState,
    token: undefined,
    login: () => {
        console.log("login")
    },
    logout: () => {
        console.log("logout")
    },
    updateUser: () => {
        console.log("updateUser")
    },
})
export type AuthType = any
export const useAuth = () => React.useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | undefined>(undefined)
    const [user, setUser] = useState<UserType>(initialUserState)
    const router = useRouter()
    const login = (token: string) => {
        setToken(token)
        setApiToken(token)
        cookie.set("token", token)
        localStorage.setItem(
            "userData",
            JSON.stringify({
                token,
            }),
        )
    }

    const logout = () => {
        setToken(undefined)
        cookie.remove("token")
        setApiToken(undefined)
        setUser(initialUserState)
        localStorage.removeItem("userData")
        router.push("/")
    }

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData") || "{}")
        if (storedData && storedData.token) {
            login(storedData.token)
        }
    }, [])

    const updateUser = (newUserData: UserType) => setUser(newUserData)

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token,
                user,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
