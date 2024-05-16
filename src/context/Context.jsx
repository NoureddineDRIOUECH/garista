import React, { createContext } from 'react'
const stateContext=createContext({
    tab:[],
    setTab:()=>{},
});
function Context({children}) {
    const [tableNames, setTableNames] = useState([]);
  return (
    <stateContext.Provide value={{
        tab,
        setTab,
    }}>
        {children}
    </stateContext.Provide>
  )
}

export default Context
