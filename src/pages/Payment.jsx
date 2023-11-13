import React, {useState,useEffect} from 'react'

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState(""); // kart sahibinin adi
  const [cvv, setCVV] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  //sayisal deger- kart no ve cvv icin
  const handleNumericInput = (e) => {
    const inputVal = e.target.value;
    e.target.value = inputVal.replace(/\D/g, "");
  };

  //kart no uzunlugu
  const handleCardNumberChange = (e) => {
    if (e.target.value.length <= 16) {
      setCardNumber(e.target.value);
    }
  };

  //cvv uzunlugu
  const handleCVVChange = (e) => {
    if (e.target.value.length <= 6) {
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
      <div className="mx-3">
        <ul className="flex items-center my-10 w-full mb-4 sm:mb-5">
          <li
            className={`flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 ${
              submitted ? "text-gray-500 dark:text-gray-400" : ""
            }`}>
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16">
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
      <div className="mx-3">
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-black">
              Ödeme Bilgileri
            </h3>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Ödeme Yöntemi Seçiniz
              </label>
              <div className="flex">
                <button
                  type="button"
                  className={`${
                    selectedPaymentOption === "troy"
                      ? "bg-blue-700"
                      : "bg-gray-300"
                  } text-white font-medium rounded-lg text-sm px-3 py-2.5 mr-2 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("troy")}
                >
                  Troy
                </button>
                <button
                  type="button"
                  className={`${
                    selectedPaymentOption === "mastercard"
                      ? "bg-blue-700"
                      : "bg-gray-300"
                  } text-white font-medium rounded-lg text-sm px-3 py-2.5 mr-2 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("mastercard")}
                >
                  Mastercard
                </button>
                <button
                  type="button"
                  className={`${
                    selectedPaymentOption === "visa"
                      ? "bg-blue-700"
                      : "bg-gray-300"
                  } text-white font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("visa")}
                >
                  Visa
                </button>
              </div>
            </div>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Kart Numarası
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234 5678 9012 3456"
                  required=""
                  onInput={handleNumericInput}
                />
              </div>
              <div>
                <label
                  htmlFor="nameOnCard"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Kart Üzerindeki Ad Soyad
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
              <div>
                <label
                  htmlFor="expirationDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Son Kullanma Tarihi
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
              <div>
                <label
                  htmlFor="cvv"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  CVV
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                </label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  value={cvv}
                  onChange={handleCVVChange}
                  onInput={handleNumericInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0123"
                  required=""
                />
              </div>
            </div>
            <div>
              <p>
                <input type="checkbox" id="3dsecure" />
                <label className="mx-2" htmlFor="3dsecure">
                  3D Secure ile ödemek istiyorum.
                </label>
              </p>
              <p>
                <input type="checkbox" id="kredikayit" />
                <label className="mx-2" htmlFor="kredikayit">
                  Kredi kartı bilgilerimin kaydedilmesini onaylıyorum.
                </label>
              </p>
            </div>
            <button
              type="submit"
              className=" my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ödemeyi Onayla
            </button>
          </form>
        )}
      </div>
    </>
  );
}


export default Payment