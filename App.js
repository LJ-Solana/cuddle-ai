
import React, {useState, useEffect} from 'react'
import AppNavigation from './src/navigation';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  return (
    <AppNavigation />
  )
}