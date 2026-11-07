import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, UserResponse } from '../services/auth'

interface AuthContextType {
  user: UserResponse | null
  loading: boolean
