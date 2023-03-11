import React, { useState } from "react";
import Loader from "../Loader/Loader";
import ResultForm from "../ResultForm/ResultForm";
import "./Form.scss";

const Form = () => {
  const [value, setValue] = useState(0);
  const [from, setFrom] = useState("DOP");
  const [to, setTo] = useState("USD");
  const [currency, setCurrency] = useState([]);
  const [loader, setLoader] = useState(null);

  const callApi = () => {
    setLoader(true);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "337ec89bc4msh66b41e032a1f0f6p166c97jsn86573a36ee9c",
        "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(
      `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${to}&want=${from}&amount=${value}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCurrency("$"+response.new_amount);
        setLoader(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <main className="app-container">
        {/*---Form---*/}
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
          <header className="form-header">
            <h3 className="form-header__title">currency converter</h3>
          </header>

          <label htmlFor="amount" className="form-container__label">
            amount
          </label>
          <input
            type="number"
            id="amount"
            className="form-container__input"
            placeholder="$0.00"
            onChange={(e) => setValue(e.target.value)}
          />

          <section className="input-select">
            <div className="from-content">
              <label htmlFor="from" className="from-content__label">
                from
              </label>
              <select
                onChange={(e) => setFrom(e.target.value)}
                id="from"
                className="from-content__select"
              >
                <option value="USD">USD</option>
              </select>
            </div>

            <div className="to-content">
              <label htmlFor="to" className="to-content__label">
                to
              </label>
              <select
                onChange={(e) => setTo(e.target.value)}
                id="to"
                className="to-content__select"
              >
                <option value="DOP">DOP</option>
              </select>
            </div>
          </section>

          {loader == true ? <Loader/> : <ResultForm currency={currency} />}

          <button
            onClick={callApi}
            type="submit"
            className="form-container__btn"
          >
            calculate amount
          </button>
        </form>
      </main>
    </>
  );
};

export default Form;
