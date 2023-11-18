import { useContext, useEffect, useState } from "react";
import { MdOutlinePrivacyTip } from "react-icons/md";
import {
  IoMdContacts,
  IoIosCloseCircle,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { SiteContext } from "../context/SiteContext";
import { Helmet } from "react-helmet";

function About() {

  const [buttonSelected, setButtonSelected] = useState("aboutButton");

  const handleButtonClick = (button) => {
    setButtonSelected(button);
  };
  const handleCloseClick = () => {
    setButtonSelected(null);
  };

  const buttonData = [
    {
      id: "aboutButton",
      label: "About",
      icon: <IoMdInformationCircleOutline />,
    },
    { id: "privacyButton", label: "Privacy", icon: <MdOutlinePrivacyTip /> },
    { id: "contactButton", label: "Contact", icon: <IoMdContacts /> },
  ];
  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="about" />
      </Helmet>
      <div className="my-20 max-w-2xl mx-auto mt-28">
        {/* buttons */}
        <div className="flex gap-x-4 mb-4">
          {buttonData.map((button) => (
            <button
              key={button.id}
              className={`px-4 py-2 font-medium text-gray-500 rounded-lg w-full ${
                buttonSelected === button.id
                  ? "bg-red-700 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleButtonClick(button.id)}
            >
              <div className="flex md:gap-x-4 gap-x-2 text-xl items-center">
                {button.icon}
                {button.label}
              </div>
            </button>
          ))}
        </div>

        {/* contents */}
        <div
          className={`p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-600 dark:bg-gray-200 rounded-lg w-full ${
            buttonSelected ? "" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-600">
              {buttonSelected === "aboutButton"
                ? "About"
                : buttonSelected === "privacyButton"
                ? "Privacy Policy"
                : buttonSelected === "contactButton"
                ? "Contact"
                : ""}
            </h3>
            <span
              onClick={handleCloseClick}
              className="text-2xl cursor-pointer"
            >
              <IoIosCloseCircle />
            </span>
          </div>
          {/* About Content */}
          {buttonSelected === "aboutButton" && (
            <p className="mb-2">
              Şirketimiz 2023 yılında kurulmuştur. Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Qui, sint similique commodi in
              voluptas vel recusandae placeat quos officiis. Iure labore aperiam
              blanditiis odio quo placeat totam eveniet deleniti facilis
              quisquam accusantium aliquam fuga atque non magni, soluta,
              voluptate, fugiat reiciendis possimus. Doloremque consequuntur
              reprehenderit fugit eum repellendus modi. Obcaecati nisi iure ea,
              nam itaque dolore hic optio similique quidem tenetur quasi
              asperiores impedit molestiae quam provident numquam fugit!
              Necessitatibus reiciendis tempore aut quod aliquam sint voluptates
              quae corrupti nostrum ea, similique nulla eligendi accusamus omnis
              ut. Fugiat consequatur exercitationem soluta minima ipsam tempora
              adipisci nulla, pariatur aspernatur laborum porro!
            </p>
          )}
          {/* Privacy Content */}
          {buttonSelected === "privacyButton" && (
            <p className="mb-2">
              Sevgili ziyaretçimiz, lütfen https://site.com web sitemizi ziyaret
              etmeden önce işbu kullanım koşulları sözleşmesini dikkatlice
              okuyunuz. Siteye erişiminiz tamamen bu sözleşmeyi kabulünüze ve bu
              sözleşme ile belirlenen şartlara uymanıza bağlıdır. Şayet bu
              sözleşmede yazan herhangi bir koşulu kabul etmiyorsanız, lütfen
              siteye erişiminizi sonlandırınız. Siteye erişiminizi sürdürdüğünüz
              takdirde, koşulsuz ve kısıtlamasız olarak, işbu sözleşme metninin
              tamamını kabul ettiğinizin, tarafımızca varsayılacağını lütfen
              unutmayınız.https://site.com web sitesi Şirket Adı tarafından
              yönetilmekte olup, bundan sonra SİTE olarak anılacaktır. İşbu
              siteye ilişkin Kullanım Koşulları, yayınlanmakla yürürlüğe girer.
              Değişiklik yapma hakkı, tek taraflı olarak SİTE'ye aittir ve SİTE
              üzerinden güncel olarak paylaşılacak olan bu değişiklikleri, tüm
              kullanıcılarımız baştan kabul etmiş sayılır.
            </p>
          )}
          {/* Contact Content */}
          {buttonSelected === "contactButton" && (
            <div>
              <p className="mb-2">
                Aşağıdaki kanallardan bize ulaşabilirsiniz.
              </p>
              <p>E-Posta: destek@ticket.com</p>
              <p>Discord: /ticket/</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default About;