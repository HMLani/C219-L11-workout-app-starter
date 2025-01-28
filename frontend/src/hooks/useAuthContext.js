import { AuthContext } from '../context/AuthContextContext'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}