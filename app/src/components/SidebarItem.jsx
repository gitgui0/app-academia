import React, { useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";

const SidebarItem = ({
  icon,
  title,
  link,
  setLink,
  minimized,
  setMinimized,
  activeComponent,
  setActiveComponent,
  iconComponent,

}) => {

  const [itemTitle, setItemTitle] = useState(title);

  const navigate = useNavigate();
  if(itemTitle === "Definicoes"){
    setItemTitle("Definições") 
  }

  useEffect(() => {
  setActiveComponent(itemTitle);
  console.log(itemTitle)
}, [itemTitle]);


  return (
    <div>
      <div
        onClick={(event) => {
          event.preventDefault();
          document.cookie = `lastPageOpened=${link}`;
          console.log(itemTitle)
          setActiveComponent(itemTitle);
          navigate(link);
          
        }}
        className={`transition-all duration-500 flex flex-row items-center space-x-2 p-2 font-medium rounded-md cursor-pointer ${
          activeComponent === itemTitle
            ? "bg-gray-200 dark:bg-neutral-900 text-blue-600 dark:text-neutral-300"
            : "hover:bg-gray-200 hover:text-blue-600 text-slate-700 dark:text-neutral-200 dark:hover:bg-neutral-900 duration-50 "
        } ${minimized ? "justify-center" : ""} `}
      >
        
        {iconComponent}
        {!minimized ? <span>{itemTitle}</span> : null}
      </div>
    </div>
  );
};

export default SidebarItem;
