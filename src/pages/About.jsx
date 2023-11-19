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
      <div className="my-20 max-w-2xl mx-auto mt-40 text-center">
        {/* buttons */}
        <div className="flex gap-x-4 mb-6">
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
          className={`p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-600 dark:bg-gray-200 rounded-lg w-full  ${
            buttonSelected ? "" : "hidden"
          }`}
        >
          <div className=" mb-2 ">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-600">
              {buttonSelected === "aboutButton"
                ? "About"
                : buttonSelected === "privacyButton"
                ? "Privacy Policy"
                : buttonSelected === "contactButton"
                ? "Contact"
                : ""}
            </h3>
          </div>
          {/* About Content */}
          {buttonSelected === "aboutButton" && (
            <>
              <p className="mb-2">
                Welcome! Ticket is a ticket purchasing platform providing access
                to thrilling events.Our mission is to offer our users the best
                event experiences. We prioritize customer satisfaction and
                secure transactions by providing a wide range of ticket options
                for easy access to events.Ticket is a reliable platform where
                you can easily purchase tickets for various events. From
                concerts to sports events, theater shows to festivals, we offer
                a broad spectrum of events to cater to your preferences.Our
                professional and passionate team strives to deliver the best
                experiences for our customers. With expertise in the event
                industry, our team is here to assist you by creating a
                user-friendly platform. Contact Us If you have any questions or
                feedback, please reach out to us through our contact page. Our
                customer service team will be delighted to assist you. Thank you
                for choosing us; we are thrilled to have you on board!
              </p>
            </>
          )}
          {/* Privacy Content */}
          {buttonSelected === "privacyButton" && (
            <p className="mb-2">
              This privacy policy applies to the ticket purchasing transactions
              and visitor information on the ticket purchasing website operated
              by Ticket. Personal Information: When you interact with us or
              purchase tickets, we may collect personal information such as your
              name, address, email address, and phone number. We use this
              information to complete your ticket purchase, send you
              information, and improve our services. We take all necessary
              measures to ensure the security of your personal information and
              never share it with third parties without your permission.
              Cookies: We may use cookies on our website. These cookies are used
              to store visitor preferences, enhance our website, and improve
              user experience. You can refuse the use of cookies by changing
              your browser settings, but this may prevent you from accessing
              some features of our website. Third-Party Links: Our website may
              contain links to third-party websites for informational purposes
              only. We are not responsible for the privacy practices of these
              third-party sites. We recommend reviewing their privacy policies
              when you visit these sites. Changes: Our privacy policy may be
              updated periodically. In the event of any changes, we will inform
              you by posting them on this page. If you have any questions about
              this privacy policy, please contact us through our contact
              section.
            </p>
          )}
          {/* Contact Content */}
          {buttonSelected === "contactButton" && (
            <div>
              <p className="mb-2">
                <div>Ticket Inc. 123 Event Avenue Cityville, State 12345</div>
                <div>Customer Support: +1 234 567 8901 Sales</div>
                <div>+1 234 567 8902</div>
                <div>info@ticket.com</div>
                <div>Discord: /ticket/</div>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default About;
