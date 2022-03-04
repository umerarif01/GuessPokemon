import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [info, setInfos] = useState([]);
  const [img, setImg] = useState("");
  const [count, SetCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    generateNext();
  }, []);

  let pokemons = [];

  async function fetchdata() {
    let rng = calcRng();
    console.log("rng =", rng);
    for (let i = 0; i < 4; i++) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 500)}`
      );
      let data = await response.json();
      console.log("i = ", i);
      if (i === rng) {
        pokemons.push({
          id: pokemons.length + 1,
          name: data.name,
          img: data.sprites.other.home.front_default,
          ans: true,
        });
      } else {
        pokemons.push({
          id: pokemons.length + 1,
          name: data.name,
          img: data.sprites.other.home.front_default,
          ans: false,
        });
      }
    }

    setInfos(pokemons);
    setImg(pokemons[rng].img);

    setLoading(true);
    setShow(true);
    console.log(pokemons);
  }

  function generateNext() {
    calcRng();
    fetchdata();
  }

  function calcRng() {
    let rngimg = Math.floor(Math.random() * 4);
    return rngimg;
  }

  const CheckAnswer = (Ans) => {
    if (Ans) {
      toast.success("Correct Answer");
      SetCount(count + 1);
      setShow(false);
      generateNext();
    } else {
      toast.error("Wrong Answer");
      setShow(false);
      generateNext();
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="">
      <Head>
        <title>Who&apos;s that Pokemon?</title>
        <meta name="description" content="Guess The Right Pokemon" />
      </Head>

      <div className="bg-black relative text-white">
        <div className="flex flex-col absolute z-50 h-full w-full justify-center items-center space-y-4 ">
          <center>
            <h1 className="text-[45px] font-title text-yellow-300 2xl:text-7xl py-4">
              Who&apos;s that Pokemon?
            </h1>

            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div className="py-3" />
            <h2 className="bg-white text-green-500 p-3 font-bold text-2xl rounded-md ">
              Score : {count}
            </h2>
          </center>

          {loading ? (
            <div className="bg-gray-800 rounded-md p-[25px] 2xl:p-[90px]">
              <h1 className="text-xl font-title text-white-300 2xl:text-4xl ">
                Guess The Right Pokemon
              </h1>

              {show ? (
                <div>
                  <center>
                    {" "}
                    <Image src={img} width={250} height={250} alt="Pokemon" />
                  </center>

                  {info.map((poke) => (
                    <div key={poke.id}>
                      <button
                        className="bg-red-500 w-full p-2 rounded-md font-semibold text-2xl font-sans hover:bg-red-600 shadow-md shadow-red-900"
                        onClick={() => CheckAnswer(poke.ans)}
                      >
                        {capitalizeFirstLetter(poke.name)}
                      </button>

                      <div className="pb-3" />
                    </div>
                  ))}
                </div>
              ) : (
                <center className="my-[150px]">
                  {" "}
                  <CircularProgress />
                </center>
              )}
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
        <div className="w-full h-screen">
          <Image
            src="/wallpaper.jpg"
            layout="fill"
            objectFit="cover"
            className="opacity-25"
          />
        </div>
      </div>

      <footer className=""></footer>
    </div>
  );
}
