import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./SideBar.css";
import { createContext, useContext, useState, useEffect } from "react";
import { SidebarContext } from "../layouts/Layout";

// Fonction pour récupérer l'élément sélectionné du stockage local
const getSelectedFromLocalStorage = () => {
  const storedItem = localStorage.getItem("selectedItem");
  return storedItem ? storedItem : "Dashboard"; // Retourner "Dashboard" par défaut si aucun élément sélectionné n'est trouvé
};

// Context pour gérer l'état de la barre latérale
export default function Sidebar({ children }) {
  const [selectedItem, setSelectedItem] = useState(getSelectedFromLocalStorage);
  const {expanded, setExpanded} = useContext(SidebarContext);

  // Fonction pour basculer l'expansion de la barre latérale
  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    // Sauvegarder l'élément sélectionné dans le stockage local
    localStorage.setItem("selectedItem", selectedItem);
  }, [selectedItem]);

  return (
    <aside className="fixed h-screen top-0 left-0 z-10">
      <nav
        className={`h-full transition-all duration-300 flex flex-col bg-white border-r shadow-sm ${
          expanded ? "w-64" : "w-16"
        }`}
      >
        <div className="p-2 pb-4 flex justify-between items-center">
          <h1
            className={`overflow-hidden transition-all ${
              expanded ? "w-32 text-4xl font-bold text-black" : "w-0"
            }`}
            style={{ lineHeight: "50px" }}
          >
            gar<span className="text-[#28509E]">i</span>sta
          </h1>
          <button onClick={toggleExpanded} className="menu-btn bg-[#28509E]">
            {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        </div>

        {/* Fournir le contexte de la barre latérale aux éléments enfants */}
        <SidebarContext.Provider
          value={{ expanded, selectedItem, setSelectedItem }}
        >
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

// Composant pour un élément de la barre latérale
export function SidebarItem({ icon, text }) {
  const { expanded, selectedItem, setSelectedItem } =
    useContext(SidebarContext);
  const isItemSelected = selectedItem === text;

  // Fonction pour gérer le clic sur un élément de la barre latérale
  const handleClick = () => {
    setSelectedItem(text);
  };

  return (
    <li
      onClick={handleClick}
      className={`relative flex ${
        expanded ? "justify-stretch" : "justify-center"
      } items-center py-2 px-3 my-1 font-medium cursor-pointer rounded-[0.75rem] ${
        isItemSelected ? "bg-[#28509E] text-white" : "bg-transparent text-black"
      } transition-all duration-200 ease-in-out ${
        !isItemSelected && expanded ? "hover:bg-gray-200 hover:text-black" : ""
      }`}
    >
      <div className="flex items-center">
        <span className="">{icon}</span>
        <span
          className={`overflow-hidden w-52 ml-3 ${!expanded && "hidden"} ${
            !isItemSelected && expanded && "hover:text-black"
          }`}
        >
          {text}
        </span>
      </div>
    </li>
  );
}
