import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import AtividadeComponent from "./AtividadesComponent";
import UsersComponent from "./UsersComponent";
import Menu from "./Menu";

const Dashboard = () => {
  //const { user, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);


  // useEffect(() => {
  //   const getUsersRole = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       setToken(token);
  //       console.log(token)

  //       const res = await axios.post(
  //         `https://dev-zwz5hap7q6sjgaau.us.auth0.com/api/v2/users/${user.sub}/roles`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       setIsAdmin(res.data.some((role) => role.name === "Admin"));

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getUsersRole();
  // }, [user, getAccessTokenSilently]);
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!getAccessTokenSilently) return;

      axios
        .post("http://localhost:5000/api/token")//not very safe btw
        .then((tokenResponse) => {
          setToken(tokenResponse.data.access_token);
          //console.log(tokenResponse.data); // Log the token here
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchData();
  }, [token]);

  const [activeComponent, setActiveComponent] = useState('atividades');

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <div className="w-full h-[100vh] p-6 flex justify-center items-center bg-zinc-100">
        
        <div className="flex flex-row h-full w-full p-16">
          {activeComponent === 'menu' && <Menu handleButtonClick={handleButtonClick} />}
          {activeComponent === 'user' && <UsersComponent token={token} handleButtonClick={handleButtonClick} />}
          {activeComponent === 'atividades' && <AtividadeComponent token={token} handleButtonClick={handleButtonClick}/>}

        </div>
      </div>
    </>
  );
};

export default Dashboard;
