
import { Header } from './components/Header'
import { Board } from './components/Board'
import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()
 
function App() {
  const [data, setData] = useState({ nodes: [], links: [] });
  useEffect(() => {
        fetch('/api/nodes')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
  }, [])

  return (
    <AppContext.Provider value={{data, setData}}>
      <Header />
      <Board />
    </AppContext.Provider>
  )
}

export default App
