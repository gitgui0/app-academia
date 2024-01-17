import React from "react";
import MenuButton from "./MenuButton";

const Menu = ({ handleButtonClick }) => {
  return (
    <div className="h-full w-full bg-transparent flex flex-row justify-center items-center space-x-12">
      <MenuButton
        title="Utilizadores"
        description="Mostrar utilizadores"
        handleButtonClick={handleButtonClick}
        menu="user"
      />
      <MenuButton
        title="Atividades"
        description="Mostrar atividades"
        handleButtonClick={handleButtonClick}
        menu="atividades"
      />
    </div>
  );
};

export default Menu;
