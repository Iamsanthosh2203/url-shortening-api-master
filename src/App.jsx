import working from "./assets/working.svg";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [shortenedLinks, setShortenedLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ulvis.net/API/write/get?url=https://www.youtube.com/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Shorten shortenedLinks={shortenedLinks} />
    </>
  );
}

function Header() {
  return (
    <header className="flex px-20 py-7 items-center justify-between">
      <div className="flex gap-12 items-center">
        <h1 className="font-bold text-4xl">Shortly</h1>

        <nav className="flex gap-6 text-gray  ">
          <a href="#" className="hover:text-black duration-150">
            Features
          </a>
          <a href="#" className="hover:text-black duration-150">
            Pricing
          </a>
          <a href="#" className="hover:text-black duration-150">
            Resources
          </a>
        </nav>
      </div>

      <div className="flex gap-12 text-gray ">
        <button className="hover:text-black duration-150">Login</button>
        <button className="p-3 px-5 rounded-full hover:bg-lightblue bg-blue text-white duration-150">
          Sign Up
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <main className="flex pl-20 h-[90vh] items-center justify-between">
      <div className="flex flex-col basis-[60%]">
        <h2 className="text-9xl font-bold text-brow gap-5 leading-snug">
          More than just <br />
          shorten links
        </h2>
        <p className="text-3xl">
          Build your brand&rsquo;s recognition and get detailed insights on how
          your links are performing.
        </p>
        <div className="mt-8">
          <button className="p-3 px-12 rounded-full hover:bg-lightblue bg-blue text-white w duration-150 text-lg">
            Get Started
          </button>
        </div>
      </div>

      <div className="basis-[40%] h-full flex items-center">
        <img src={working} alt="working" className="w-full translate-x-12" />
      </div>
    </main>
  );
}

// eslint-disable-next-line react/prop-types
function Shorten({ shortenedLinks }) {
  return (
    <section className="bg-[#d6d6d6] flex flex-col items-center">
      <div className="w-[70%] h-auto bg-cover flex p-12 justify-around rounded-xl -translate-y-[50%]">
        <input
          type="text"
          name=""
          id=""
          className="w-[80%] placeholder:text-red-400 rounded-xl p-4"
          placeholder="Shorten a link here..."
        />
        <button className="w-[15%] p-3 px-12 rounded-lg hover:bg-lightblue bg-blue text-white w duration-150 text-lg">
          Shorten It
        </button>
      </div>

      <div className="w-full flex justify-center">
        <ul className="w-[70%] flex flex-col gap-6">
          {shortenedLinks.map((link, index) => (
            <li
              key={index}
              className="bg-white w-full p-9 rounded-xl flex justify-between"
            >
              <p className="text-lg">{link.originalUrl}</p>
              <div className="flex gap-6 items-center">
                <span className="text-blue text-lg">{link.shortenedUrl}</span>
                <button className="p-3 px-5 rounded-full hover:bg-lightblue bg-blue text-white duration-150">
                  Copy
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
