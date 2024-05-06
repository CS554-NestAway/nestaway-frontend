import React, { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import { houseData } from "../sample";
import { Carousel } from "react-responsive-carousel";
import { ButtonGroup } from "./ButtonGroup";
import ListingWizard from "./ListingWizard";
import { AuthContext } from "../../contexts/AuthContext";

const Host = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [wizardVisible, setWizardVisible] = useState(true);
  const [wizardMode, setWizardMode] = useState("add");

  const { toggleSearchVisible } = useContext(ThemeContext);

  const listingButtons = [
    { name: "allListings", label: "All Listings" },
    { name: "currentlyHosting", label: "Currently Hosting" },
    { name: "upcoming", label: "Upcoming" },
    { name: "pendingReview", label: "Pending Review" },
  ];

  const [activeButton, setActiveButton] = useState(listingButtons[0].name);

  const handleButtonClick = useCallback((buttonName) => {
    setActiveButton(buttonName);
  }, []);

  const handleAddListing = useCallback(() => {
    setWizardVisible(true);
    setWizardMode("add");
  }, []);

  const handleUpdateListing = useCallback(() => {
    setWizardVisible(true);
    setWizardMode("update");
  }, []);

  const handleCloseWizard = useCallback(() => {
    setWizardVisible(false);
  }, []);

  useEffect(() => {
    toggleSearchVisible(false);

    return () => {
      toggleSearchVisible(true);
    };
  }, []);

  return (
    <div
      className={`flex flex-col w-full h-screen px-20 py-4 font-didact gap-4 bg-accent1 text-accent2 ${
        wizardVisible ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <div className="flex w-full justify-between">
        <p className="text-xl">
          Welcome, <span className="font-bold">{currentUser?.displayName}</span>
        </p>
        <button
          className={`text-primary rounded-lg ml-auto p-2 border-2 border-primary  hover:bg-primary hover:text-accent1`}
          onClick={handleAddListing}
        >
          Add New Listing
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="">
          <span className="text-xl mx-2">Your Listings</span>
          <ButtonGroup
            buttons={listingButtons}
            selectedButton={activeButton}
            handleButtonClick={handleButtonClick}
          />
        </div>
        <div className="border-b border-accent2 w-full"></div>
        <div className="flex gap-4">
          {houseData.slice(0, 2).map((house) => (
            <div
              key={house.house_id}
              className="bg-accent1 shadow-shadow2 rounded-lg overflow-hidden hover:bg-secondary cursor-pointer w-60"
              onClick={() => handleUpdateListing()}
            >
              <Carousel
                showThumbs={false}
                showIndicators={true}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                className="max-w-screen-lg"
              >
                {house.photo &&
                  house.photo.map((photo, index) => (
                    <img
                      key={house.house_id + index}
                      src={photo}
                      alt={house.title}
                      className="w-full h-40 object-cover object-center"
                    />
                  ))}
              </Carousel>
              <div className="p-4 text-accent2">
                <h3 className="text-lg font-semibold mb-2">{house.title}</h3>
                <p className="text-accent2 mb-2">
                  Price per night: ${house.price_per_night}
                </p>
                <p className="text-accent2 mb-2">Location: {house.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ListingWizard
        active={wizardVisible}
        mode={wizardMode}
        onClose={handleCloseWizard}
      />
    </div>
  );
};

export default Host;
