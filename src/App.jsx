import { use, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [selectFromCountery, setFromSelectCountry] = useState("USD");
  const [selectToCountery, setToSelectCountry] = useState("INR");
  const [countryCData, setCountryCData] = useState({});
  const [dataKey, setDataKey] = useState("");
  const [inputValue, setInputValue] = useState(0);
  const [displayResult, setDisplayResult] = useState(0);
  const [rate, setRate] = useState("");
  const [exchangeFun, setExchangeFun] = useState(false);

  useEffect(() => {
    const currencyData = async () => {
      const data = await fetch(
        `https://open.er-api.com/v6/latest/${selectFromCountery}`
      );
      const result = await data.json();
      setCountryCData(result.rates);
      // console.log(result);
      return result.rates;
    };
    currencyData();
  }, [selectFromCountery]);

  useEffect(() => {
    const key = Object.keys(countryCData);
    setDataKey(key);
  }, [countryCData]);

  const switchAmount = () => {
    const newFrom = displayResult;
    setInputValue(newFrom);

    const fromNewSelectCountery = selectToCountery;
    const toNewSelectCountery = selectFromCountery;

    setFromSelectCountry(fromNewSelectCountery);
    setToSelectCountry(toNewSelectCountery);
    setDisplayResult(0);
  };

  const exchangeHeldle = () => {
    let newInput = inputValue;

    if (inputValue <= 0) {
      setInputValue(1);
      newInput = 1;
    }

    const Rate = countryCData[selectToCountery];
    const Resut = (newInput * Rate).toFixed(2);
    setRate(Rate);
    setDisplayResult(Resut);
  };

  return (
    <>
      <section className=" flex justify-center items-center relative h-screen  w-full bg-[url('https://wallpapers.com/images/hd/finance-background-lmbrnieyixwr61g9.jpg')] bg-cover bg-no-repeat ">
        <form className="box-border relative w-full p-4 m-5 text-white border border-2 border-white rounded-lg backdrop-blur-sm min-h-1/3 lg:w-1/3">
          <h1 className="p-4 text-2xl font-semibold text-center font-">
            Currency Convorter App
          </h1>

          <div className="flex items-center justify-between p-2 mb-6 text-black bg-white rounded-lg">
            <div className="left flex flex-col gap-2.5 ">
              <label htmlFor="from" className="text-lg text-gray-500">
                From:
              </label>
              <input
                type="number"
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setDisplayResult(0);
                }}
                value={inputValue && inputValue}
                id="from"
                placeholder="Enter Amount"
                className="text-2xl border-none outline-none "
              />
            </div>
            <div className="right flex flex-col gap-2.5">
              <h2 className="text-gray-500">{selectFromCountery}</h2>
              <select
                value={selectFromCountery}
                onChange={(e) => {
                  setFromSelectCountry(e.target.value);
                }}
              >
                {typeof dataKey == "object" &&
                  dataKey.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 mb-6 text-black bg-white rounded-lg">
            <div className="left flex flex-col gap-2.5 ">
              <label htmlFor="from" className="text-lg text-gray-500">
                To:
              </label>
              <input
                value={displayResult}
                disabled
                id="from"
                placeholder="Get here your amount"
                className="text-2xl border-none outline-none "
              />
            </div>
            <div className="right flex flex-col gap-2.5">
              <h2 className="text-gray-500">{selectToCountery}</h2>
              <select
                // defaultValue={selectToCountery}
                value={selectToCountery}
                onChange={(e) => {
                  setToSelectCountry(e.target.value);
                }}
              >
                {typeof dataKey == "object" &&
                  dataKey.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              switchAmount();
            }}
            className="absolute top-[45%] left-[45%] box-border  py-1 px-2 bg-blue-700 w-fit rounded-lg font-semibold  cursor-pointer"
          >
            Swap
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              exchangeHeldle();
            }}
            className="box-border w-full p-2 text-lg font-semibold bg-blue-600 rounded-lg cursor-pointer"
          >
            Convort {selectFromCountery} to {selectToCountery}
          </button>
        </form>
      </section>
    </>
  );
}
export default App;
