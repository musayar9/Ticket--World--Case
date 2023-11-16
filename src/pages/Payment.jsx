import React, { useState, useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import { formatPrice } from "../components/Functions";
// import { FiInfo } from "react-icons/fi";
import { ImInfo } from "react-icons/im";

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState(""); // kart sahibinin adi
  const [cvv, setCVV] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const { totalCost } = useContext(SiteContext)

  //kart no uzunlugu
  const handleCardNumberChange = (e) => {
    if (e.target.value.length <= 16) {
      setCardNumber(e.target.value);
    }
  };

  //cvv uzunlugu
  const handleCVVChange = (e) => {
    if (e.target.value.length <= 3) {
      setCVV(e.target.value);
    }
  };

  // ad soyad kismi
  const handleNameOnCardChange = (e) => {
    const inputVal = e.target.value;
    setNameOnCard(inputVal.replace(/\d/g, ""));
  };

  // form gönderimi
  const handleSubmit = (e) => {
    e.preventDefault();

    //odeme onay kismi
    if (cardNumber && nameOnCard && cvv) {
      console.log("Ödeme Onaylandı!");
      setSubmitted(true);
    } else {
      console.log("Lütfen tüm alanları doldurun!");
    }
  };

  //odeme secenegi
  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  return (
    <>
      {/* progress stepper */}
      <div className="mx-3">
        <ul className="flex items-center my-10 w-full mb-4 sm:mb-5">
          <li
            className={`flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 ${
              submitted ? "text-gray-500 dark:text-gray-400" : ""
            }`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </div>
          </li>
          <li
            className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700 ${
              submitted ? "text-blue-600 dark:text-blue-300" : ""
            }`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
              </svg>
            </div>
          </li>
          <li
            className={`flex items-center`}
            // className={`flex items-center w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700${
            //     submitted ? "text-blue-600 dark:text-blue-300" : ""
            //   }`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </div>
          </li>
        </ul>
      </div>
      {/* payment form */}
      <div className="mx-3">
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-black">
              Payment Information
            </h3>
            {/* payment method */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Select Payment Method
              </label>
              <div className="flex ">
                {/* <button
                  type="button"
                  className={`${
                    selectedPaymentOption === "troy"
                      ? "bg-blue-700"
                      : "bg-gray-300"
                  } text-white font-medium rounded-lg text-sm px-3 py-2.5 mr-2 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("troy")}
                >
                  Troy
                </button> */}
                <button
                  type="button"
                  className={`${
                    selectedPaymentOption === "mastercard"
                      ? "bg-blue-700"
                      : "bg-gray-300"
                  } text-white font-medium rounded-lg text-sm px-1.5 py-1 mr-2 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("mastercard")}
                >
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width={38}
                    height={24}
                    aria-labelledby="pi-master"
                  >
                    <title id="pi-master">Mastercard</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    />
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <circle fill="#EB001B" cx={15} cy={12} r={7} />
                    <circle fill="#F79E1B" cx={23} cy={12} r={7} />
                    <path
                      fill="#FF5F00"
                      d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${
                    selectedPaymentOption === "visa"
                      ? "bg-blue-700"
                      : "bg-gray-300"
                  } text-white font-medium rounded-lg text-sm px-1.5 py-1 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("visa")}
                >
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width={38}
                    height={24}
                    aria-labelledby="pi-visa"
                  >
                    <title id="pi-visa">Visa</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    />
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <path
                      d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                      fill="#142688"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* card information */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              {/* card number */}
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Card Number
                </label>
                <input
                  type="number"
                  name="cardNumber"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234 5678 9012 3456"
                  required=""
                />
              </div>
              {/* card holder name */}
              <div>
                <label
                  htmlFor="nameOnCard"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Card Holder Name
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  id="nameOnCard"
                  value={nameOnCard}
                  onChange={handleNameOnCardChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                />
              </div>
              {/* expiration date */}
              <div>
                <label
                  htmlFor="expirationDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Expiration Date
                </label>
                <input
                  type="month"
                  name="expirationDate"
                  id="expirationDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  //   placeholder="MM/YYYY"
                  required=""
                />
              </div>
              {/* cvv */}
              <div>
                <label
                  htmlFor="cvv"
                  className="inline-flex gap-x-1 mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  CVV <ImInfo/>
                  
                  {/* <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg> */}
                </label>
                <input
                  type="number"
                  name="cvv"
                  id="cvv"
                  value={cvv}
                  onChange={handleCVVChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="It is the three-digit code printed on the back of the card."
                  required=""
                />
              </div>
            </div>
            {/* Total Cost */}
            <div className="my-2">
              <hr className="border border-t-2" />
              <h3 className="my-2 text-base font-bold text-center text-gray-700">TOTAL : <span>{`${formatPrice(totalCost.toFixed(2))}`}</span></h3>
              <hr className="border border-b-2" />
              
            </div>
            {/* checkbox */}
            <div>
              <p>
                <input type="checkbox" id="3dsecure" />
                <label className="mx-2" htmlFor="3dsecure">
                  I want to pay with 3D Secure.
                </label>
              </p>
              <p>
                <input type="checkbox" id="kredikayit" />
                <label className="mx-2" htmlFor="kredikayit">
                  I accept{" "}
                  <span className="text-blue-700 font-semibold cursor-pointer">
                    Information Notice Regarding Personal Data Processing
                  </span>{" "}
                  regarding the storage of my card.
                </label>
              </p>
            </div>
            {/* pay */}
            <button
              type="submit"
              className={`my-3 text-black ${
                !cardNumber || !nameOnCard || !cvv
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
              } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              disabled={!cardNumber || !nameOnCard || !cvv}
              //  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            >
              Confirm Payment
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Payment;
