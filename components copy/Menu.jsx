import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";
import axios from "axios";
import AlertToast from "./AlertToast";

const Menu = ({ handleButtonClick }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();
  const [toastStatus, setToastStatus] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then(() => {
        // Navigate to the login page after successful logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const testConn = () => {
    axios
      .get("/api/protected")
      .then((response) => {
        setToastMessage(response.data.message);
        setToastStatus(response.status);
        setShowToast(true);
      })
      .catch((error) => {
        // Se nao autorizado(401) redirect para o login
        if (error.response.status == 401) {
          //navigate("/login")
          console.log(error);
          navigate("/login", {
            state: {
              error: error.response.data.message,
              status: error.response.status,
            },
          });
        }
      });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000); // Change this to set the duration for which the toast is visible

      return () => clearTimeout(timer); // This will clear the timer if the component is unmounted before the timer finishes
    }
  }, [showToast]);
  return (
    <>
      {showToast ? (
          <AlertToast message={toastMessage} status={toastStatus} />
        ) : null}
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
        <MenuButton
          title="Perfil"
          description="Ver o seu Perfil"
          handleButtonClick={handleButtonClick}
          menu="profile"
        />
        <button onClick={handleLogout}>Logout</button>
        <button onClick={testConn}>TestConn</button>
      </div>
    </>
  );
};

export default Menu;
