import React, { createContext, useContext, useState } from 'react'

interface UserInfo {
    name: string
    photoUrl?: string
    gender?: string
    age?: number
    portraitUrl?: string   // 서버로부터 받은 영정사진 URL
}

interface UserContextType {
    user: UserInfo
    setUser: (user: UserInfo) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInfo>({
        name: '',
        photoUrl: '',
        gender: '',
        age: undefined,
        portraitUrl: '',
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}