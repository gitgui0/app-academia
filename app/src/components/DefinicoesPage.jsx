import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const DefinicoesPage = ({
  sidebarMinimized,
  setSidebarMinimized,
  colormode,
  setcolormode,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    cargo: "",
    fsg: "",
    pfp_url: "",
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/userinfo", {})
      .then((response) => {
        let userInfo = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          cargo: response.data.cargo,
          fsg: response.data.fsg,
          pfp_url: response.data.pfp_url,
        };
        setUser(userInfo);
        console.log(user);
        setIsLoading(false);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);
  return (
    <>
      <div className="definicoes w-full h-full flex justify-center rounded-lg py-3 px-0 sm:px-6 bg-zinc-100 dark:bg-[#0f0f0f] dark:shadow-neutral-900 shadow-md hover:shadow-sm rounded-r-md  duration-500">
        <div className="flex flex-col w-[90%] md:w-[70%] space-y-3 overflow-y-auto ">
          <div>
            <h1 className="font-bold text-3xl ml-3 mb-3 text-black dark:text-white">
              Perfil
            </h1>
            <div
              className={`flex space-x-2  sm:space-x-8 xl:space-x-8 border-[1px] ${
                isLoading ? "justify-center" : "justify-between"
              } border-gray-300 dark:border-neutral-700 rounded-md px-3 py-6 `}
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-7 h-7 text-white animate-spin dark:text-neutral-600 fill-blue-600 dark:fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  <div className="flex flex-col justify-between items-center py-5 pl-4 pr-6 sm:pl-12 sm:pr-16 space-y-6 border-gray-300 dark:border-neutral-600 border-r-[1px]">
                    <img
                      src="pfp.png"
                      className="rounded-full w-20 h-20 md:w-32 md:h-32 shadow-none hover:shadow-lg hover:scale-[1.025] duration-200 "
                    />
                    <button className="bg-gray-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-100 rounded-md py-1 px-3 border-2 border-gray-200 dark:border-neutral-800 hover:bg-transparent dark:hover:bg-transparent duration-200">
                      Alterar foto
                    </button>
                  </div>

                  <div className="flex flex-col text-black text-base pl-5 md:pl-0 dark:text-neutral-300 xl:flex-row flex-grow items-center justify-around xl:justify-evenly  ">
                    <div className="w-full">
                      <h2 className="text-sm font-medium leading-7">Nome</h2>
                      <p className="dark:text-white">{user.name}</p>
                    </div>

                    <div className="w-full">
                      <h2 className="text-sm font-medium leading-7">Email</h2>
                      <p className="dark:text-white">{user.email}</p>
                    </div>
                    <div className="w-full">
                      <h2 className="text-sm font-medium leading-7">Cargo</h2>
                      <p className="dark:text-white">Professor</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <div
              className={`flex space-x-2  sm:space-x-6 xl:space-x-12 border-[1px] border-gray-300 dark:border-neutral-700 rounded-md px-3 py-6 `}
            >
              <>
                <div className="w-full flex flex-col justify-between px-3 space-y-6">
                  <h1 className="font-bold text-left text-xl mb-3 text-black dark:text-white">
                    Preferências
                  </h1>
                  <div className="w-full flex flex-col">
                    <h1 className="font-bold text-left text-lg mb-3 text-black dark:text-white">
                      Tema
                    </h1>
                    <div className="w-full flex justify-between text-black dark:text-white ">
                      <div
                        className={` flex flex-col space-y-2  cursor-pointer w-[49%] tracking-tight border-[1px] ${
                          colormode === "light"
                            ? "border-blue-600 dark:border-blue-600 "
                            : "border-gray-300 dark:border-neutral-600 "
                        }  rounded-md px-3 py-6  hover:relative shadow-none hover:shadow-md  duration-200`}
                        onClick={() => setcolormode("light")}
                      >
                        <div>
                          {" "}
                          <h1 className=" font-semibold">Claro</h1>
                        </div>

                        <p className="dark:text-neutral-300">O tema claro original.</p>
                      </div>
                      <div
                        className={` flex flex-col space-y-2 cursor-pointer w-[49%] tracking-tight border-[1px] ${
                          colormode === "dark"
                            ? "border-blue-600 dark:border-blue-600 "
                            : "border-gray-300 dark:border-zinc-200 "
                        }  rounded-md px-3 py-6  hover:relative shadow-none hover:shadow-md  duration-200`}
                        onClick={() => setcolormode("dark")}
                      >
                        <div className="flex  space-x-2">
                          <h1 className=" font-semibold">Escuro</h1>
                          <h1 className={`${colormode === "light" ? "bg-slate-200 text-slate-700" : "bg-slate-700 text-slate-200"} px-1 rounded-sm`}>Beta</h1>
                        </div>

                        <p className="dark:text-neutral-300">
                          O tema escuro é uma variante do tema claro original
                          usando uma base mais escura para ajudar a reduzir o
                          cansaço visual.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefinicoesPage;
