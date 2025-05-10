// contexts/UserContext.tsx
import React, { createContext, useContext, useState } from 'react'

export interface UserInfo {
    name: string
    photoUrl?: string
    gender?: string
    age?: number
    portraitUrl?: string
}

interface UserContextType {
    user: UserInfo
    setUser: (user: UserInfo) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInfo>({
        // ✅ 개발용 fake data
        name: '홍길동',
        photoUrl: 'https://via.placeholder.com/150',
        gender: '남성',
        age: 30,
        portraitUrl: '',    // 메인 페이지에서 fake portrait 할 예정
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