import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AtividadeComponent from "./AtividadesComponent";
import UsersComponent from "./UsersComponent";
import Menu from "./Menu";
import Profile from "./Profile";
import TokenContext from "../app/src/TokenContext";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log("valid");
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const [activeComponent, setActiveComponent] = useState("menu");

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
    //console.log(componentName)
  };


  return (
    <>
      <div className="w-full h-[100vh] p-6 flex justify-center items-center bg-zinc-100 dark:bg-red-500">
        <div className="h-full w-full p-5">
          {activeComponent === "menu" && (
            <Menu handleButtonClick={handleButtonClick} />
          )}
          {activeComponent === "user" && (
            <UsersComponent
              token={token}
              handleButtonClick={handleButtonClick}
            />
          )}
          {activeComponent === "atividades" && (
            <AtividadeComponent
              token={token}
              handleButtonClick={handleButtonClick}
            />
          )}
          {activeComponent === "profile" && (
            <Profile token={token} handleButtonClick={handleButtonClick} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
