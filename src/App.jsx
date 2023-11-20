import working from "./assets/working.svg";
import { useState } from "react";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Shorten />
    </>
  );
}

function Header() {
  return (
    <header className="flex px-4 md:px-20 py-7 items-center justify-between">
      <div className="flex gap-12 items-center w-full md:w-auto justify-between md:justify-normal">
        <h1 className="font-bold text-4xl">Shortly</h1>

        <div className="md:hidden">
          <i className="fa-solid fa-bars"></i>
        </div>

        <nav className="hidden md:flex gap-6 text-gray  ">
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

      <div className="hidden md:flex gap-12 text-gray ">
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
    <main className="flex flex-col-reverse md:flex-row md:pl-20 h-auto md:min-h-[90vh] items-center justify-between">
      <div className="flex flex-col md:items-start items-center basis-[60%]">
        <h2 className="md:text-9xl text-4xl my-5 md:my-0 text-center md:text-left font-bold text-brow gap-5 leading-snug">
          More than just <br />
          shorten links
        </h2>
        <p className="text-xl text-center md:text-left md:text-3xl">
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
function Shorten() {
  const [responseData, setResponseData] = useState([]);
  const [url, setUrl] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${url}&cu=`
      );
      const data = await response.json();
      console.log(data);
      setResponseData([
        ...responseData,
        {
          id: Math.random(),
          url: url,
          short: `https://1pt.co/${data.short}`,
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const handleCopy = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied to clipboard!");
    } catch (error) {
      console.error("Unable to copy to clipboard", error);
      alert("Unable to copy to clipboard. Please copy it manually.");
    }
  };

  const handleDelete = (itemId) => {
    const updatedData = responseData.filter((item) => item.id !== itemId);
    setResponseData(updatedData);
  };

  return (
    <section className="bg-[#d6d6d6] flex flex-col items-center  md:mt-0 mt-[10em]">
      <div className="w-[90%] md:w-[70%] h-auto bg-cover flex p-12 justify-around rounded-xl -translate-y-[50%] flex-col md:flex-row gap-5">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id=""
          className="md:w-[80%] placeholder:text-red-400 rounded-xl p-4"
          placeholder="Shorten a link here..."
        />

        <button
          onClick={fetchData}
          className="md:w-[15%] p-3 px-12 rounded-lg hover:bg-lightblue bg-blue text-white w duration-150 text-lg"
        >
          Shorten It
        </button>
      </div>

      <div className="w-full flex justify-center">
        <ul className="md:w-[70%] flex flex-col gap-6">
          {responseData.map((item) => (
            <li
              key={item.id}
              className="bg-white w-full p-9 rounded-xl flex justify-between md:flex-row flex-col my-5"
            >
              <div className="flex items-center">
                <p className="text-lg text-center w-full md:w-auto md:text-left">
                  {item.url}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <span className="text-blue text-lg">
                  <a
                    href={item.short}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.short}
                  </a>
                </span>

                <div className="flex gap-5">
                  <button
                    onClick={() => handleCopy(item.short)}
                    className="p-3 px-5 rounded-full hover:bg-lightblue bg-blue text-white duration-150"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-red-500 rounded-full text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
