import React, { useState, createContext, useContext } from 'react';

// Création du contexte
const MyContext = createContext();

// Hook personnalisé pour accéder au contexte
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

// Fournisseur de contexte
const MyContextProvider = ({ children }) => {
  // État local pour myState
  const [myState, setMyState] = useState(false);

  // Fonction pour basculer myState
  const toggleState = () => {
    setMyState(prevState => !prevState);
  };

  // Rendu du fournisseur de contexte avec la valeur fournie
  return (
    <MyContext.Provider value={{ myState, toggleState }}>
      {children}
    </MyContext.Provider>
  );
};


export default MyContextProvider;
