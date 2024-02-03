import React, { useEffect, useState } from "react";
import axios from "axios";

const AtividadesComponent = ({ token, handleButtonClick }) => {
  const [atividades, setAtividades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newAtividade, setNewAtividade] = useState({
    name: "",
    user_id: "auth0|65999d197d1aba9a56a35600",
  });

  const fetchAtividades = async () => {
    setIsLoading(true);

    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/getatividades",
          {
            user_id: "auth0|65999d197d1aba9a56a35600", // Replace with the actual user_id
          },
          {
            headers: {
              //descobrir porque token variavel nao funciona
              Authorization: `Bearer ${token}`, // Use the token here
            },
          }
        );

        setAtividades(response.data); // Set atividades with the response data
        setIsLoading(false); // Set isLoading to false
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchAtividades();
    }
  }, [token]);

  const handleInputChange = (event) => {
    setNewAtividade({
      ...newAtividade,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createAtividade",
        {
          ...newAtividade,
          valid_ids: [newAtividade.user_id], // Wrap user_id in an array
        },
        {
          headers: {
            //descobrir porque token variavel nao funciona
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpXa0taTXBKdFh0cll2M0ZqYk82SyJ9.eyJpc3MiOiJodHRwczovL2Rldi16d3o1aGFwN3E2c2pnYWF1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ1blFIRzZiVkRxNk1iQ0RpVEtxU015T3g4b2RNZkpob0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2FwaSIsImlhdCI6MTcwNTM2NDAzMiwiZXhwIjoxNzA1NDUwNDMyLCJhenAiOiJ1blFIRzZiVkRxNk1iQ0RpVEtxU015T3g4b2RNZkpobyIsInNjb3BlIjoicmVhZDptZXNzYWdlcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.GXpQqZ-QCSA6jj0VMGkw9s4gMI9jN_RFup39ugKQRTPI4zWCMaxHbSHN5RmBI2oRpzzOqN4QFvPZDrjg39HDUyQ4Bu2_LimsOuz175uW9P0N_RFh2MEO6l5aNLKCARDAMTM1Ah97EEkk1WF7x55fa6qqmoxiCKYWyCCr10x8PDqTt55gJTUfF9Z0sW7dpdDuyHdIp5xC1cK1-POamJP1JYu3pXo6LUcjIVcXNzOBgeYnMPBxeoAtRghLI7iPukiU9ANVuwYSqG49D3_bEfKW37qxVftRS_ddaQNJx3fBTeugA-TGk1jpfJnWrULKO766tsJn6aCOUuEknwpFxQUPKw`, // Use the token here
          },
        }
      );
      setNewAtividade({ name: "", user_id: "auth0|65999d197d1aba9a56a35600" });
      fetchAtividades();
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-zinc-300 h-full w-full flex flex-col px-5 py-2 space-y-5">
        <div className="">
          <button onClick={() => handleButtonClick("menu")}>
            Back to Menu
          </button>
        </div>

        <div className=" flex flex-col space-y-3">
          <h2 className="font-bold text-[20px]">Atividades</h2>
          <div className="flex flex-row space-x-2">
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
            ) : atividades.length === 0 ? (
              <p>Não existem atividades</p>
            ) : (
              atividades.map((atividade, index) => (
                <div
                  className="bg-white hover:bg-zinc-100 duration-150 p-3 rounded-md cursor-pointer"
                  key={index}
                >
                  <h2>{atividade.name}</h2>
                  <p>Date: {atividade.date}</p>
                  <p>Number of participants: {atividade.n_participants}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col w-full space-y-3">
            <h2 className="font-bold text-[20px]">Create Atividade</h2>
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={newAtividade.name}
                  onChange={handleInputChange}
                  placeholder="Atividade Name"
                  className="w-full"
                  required
                />
                <input
                  type="text"
                  name="user_id"
                  value={newAtividade.user_id}
                  onChange={handleInputChange}
                  placeholder="User ID"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <button className="bg-green-200 w-full " type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtividadesComponent;
