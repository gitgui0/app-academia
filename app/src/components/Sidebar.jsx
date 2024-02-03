import React, { useState } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({
  minimized,
  setMinimized,
  activeComponent,
  setActiveComponent,
  colorMode,
  setlink,
}) => {
  const changeSidebarSize = () => {
    console.log(minimized);
    setMinimized(!minimized);
  };

  let imgSrc;
  if (minimized && colorMode === "light") {
    imgSrc = "h_logo_stripped.png";
  } else if (minimized && colorMode === "dark") {
    imgSrc = "h_b_logo_stripped.png";
  } else if (!minimized && colorMode === "light") {
    imgSrc = "v_logo.png";
  } else {
    imgSrc = "v_b_logo.png";
  }

  return (
    <>
      <button
        onClick={changeSidebarSize}
        className={`${
          minimized ? "absolute top-2 left-2" : "hidden"
        } lg:hidden bg-zinc-200 dark:bg-neutral-950 text-slate-700 dark:text-zinc-400 p-[2px] rounded-md flex items-center cursor-pointer z-20`}
      >
        <span className="material-symbols-outlined ">menu</span>
      </button>
      <div
        className={` absolute z-20 transition-all bg-zinc-200 dark:bg-transparent duration-100 ease-in-out lg:max-w-80 lg:min-w-20 lg:static h-full w-3/4 sm:w-2/3 md:w-1/2 ${
          minimized ? "hidden lg:flex lg:w-[5%] " : "lg:w-[4/12] "
        }`}
      >
        <div className="flex flex-col w-full h-[98%]  bg-zinc-100 dark:bg-[#0f0f0f] dark:shadow-neutral-900 shadow-md hover:shadow-sm rounded-md  duration-500 ">
          <div className=" text-zinc-200 dark:text-neutral-950 bg-purple-600 sm:bg-blue-600 md:bg-emerald-600 lg:bg-orange-700  font-semibold h-[5px]">
            a
          </div>

          <div
            className={`${
              minimized ? "hidden" : "flex"
            } h-full md:flex flex-col justify-between transition-all duration-500 ease-in-out`}
          >
            <div className="flex-col space-y-4  px-2">
              <div
                className={`header flex flex-row h-20 w-full ${
                  minimized ? "justify-center " : "justify-between pl-2"
                }  items-center`}
              >
                <img
                  onClick={() => {
                    if (minimized) changeSidebarSize();
                  }}
                  src={imgSrc}
                  className={`${minimized ? "h-12 cursor-pointer " : "h-14 "}`}
                />
                <button
                  onClick={changeSidebarSize}
                  className="h-full text-black dark:text-zinc-400 md:opacity-0 rounded-md md:hover:opacity-100 duration-200"
                >
                  <span
                    // hover, fazer com que desapareca e no hover aparecer
                    className={`material-symbols-outlined bg-zinc-200 p-2 rounded-full dark:bg-neutral-950 transition-all duration-500 ease-in-out ${
                      minimized ? "hidden" : "rotate-[270deg]"
                    }`}
                  >
                    expand_less
                  </span>
                </button>
              </div>
              <div className="flex flex-col space-y-3 justify-center overflow-x-hidden overflow-y-auto">
                <SidebarItem
                  activeComponent={activeComponent}
                  setActiveComponent={setActiveComponent}
                  minimized={minimized}
                  setMinimized={setMinimized}
                  iconComponent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                      />
                    </svg>
                  }
                  title="Atividades"
                  link="/"
                  onClick={() => {
                    setlink("/");
                    document.cookie = `lastPageOpened=/`;
                  }}
                />
                <SidebarItem
                  activeComponent={activeComponent}
                  setActiveComponent={setActiveComponent}
                  minimized={minimized}
                  setMinimized={setMinimized}
                  iconComponent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  }
                  title="Utilizadores"
                  link="/"
                  onClick={() => {
                    setlink("/");
                    document.cookie = `lastPageOpened=/`;
                  }}
                />
                <SidebarItem
                  activeComponent={activeComponent}
                  setActiveComponent={setActiveComponent}
                  minimized={minimized}
                  setMinimized={setMinimized}
                  iconComponent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  }
                  title="Definicoes"
                  link="/definicoes"
                  setlink={setlink}
                />
              </div>
            </div>
            <div
              className={`flex flex-col justify-center py-3 pb-4 rouded-r-md cursor-pointer bg-transparent ${
                minimized
                  ? ""
                  : "hover:bg-gray-200 dark:hover:bg-neutral-950  duration-300"
              } `}
            >
              <div
                className={`flex flex-row px-4 space-x-5 items-center font-medium ${
                  minimized ? "justify-center" : ""
                }`}
              >
                <img src="pfp.png" className="w-10 rounded-full" />
                {minimized ? (
                  ""
                ) : (
                  <h1 className="text-black dark:text-white">Mafarrico</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
