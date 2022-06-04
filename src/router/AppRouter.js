import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { LoginScreen } from '../components/auth/LoginScreen'
import { HomeRouter } from './HomeRouter'
import { useDispatch, useSelector } from 'react-redux'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { startChecking } from '../actions/auth'

export const AppRouter = () => {

  const { checking, uid } = useSelector( state => state.authReducer )

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch( startChecking() )
  
  }, [dispatch])
  

  // if(checking) {
  //   return (<h5>Espere...</h5>)
  // }

  return (
    <Routes>
      <Route 
        path='login' 
        element={
          <PublicRoute uid={ uid }>
            <LoginScreen />
          </PublicRoute> 
        }
      />
      <Route 
        path='register' 
        element={ 
          <PublicRoute uid={ uid }>
            <RegisterScreen />  
          </PublicRoute>
        }
      />
      <Route 
        path='/' 
        element={ 
          <PrivateRoute uid={ uid }>
            <HomeRouter /> 
          </PrivateRoute>  
        }
      />

      <Route 
        path='*' 
        element={ 
          <PrivateRoute uid={ uid }>
            <Navigate replace to='/' /> 
          </PrivateRoute>  
        } 
      />
    </Routes>
    
  )
}
