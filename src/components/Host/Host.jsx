import { useCallback, useContext, useEffect, useState } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import { Carousel } from "react-responsive-carousel";
import { ButtonGroup } from "./ButtonGroup";
import ListingWizard from "./ListingWizard";
import { AuthContext } from "../../contexts/AuthContext";
import {
  initialAmenities,
  initialDetails,
  initialFeatures,
  initialPolicies,
  initialRules,
} from "../../constants";
import api, { HostURL } from "../../api";
import { Navigate } from "react-router-dom";

const Host = () => {
  const { currentUser } = useContext(AuthContext);
  const [wizardVisible, setWizardVisible] = useState(false);
  const [houseData, setHouseData] = useState([]);
  const [houseDetails, setHouseDetails] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

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
    setIsUpdateMode(false);
  }, []);

  const handleUpdateListing = useCallback((id) => {
    api
      .get(HostURL + id)
      .then((response) => {
        setHouseDetails(response.data);
        setWizardVisible(true);
        setIsUpdateMode(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCloseWizard = useCallback(() => {
    setWizardVisible(false);
    setHouseDetails(null);
    api
      .get(HostURL)
      .then((response) => {
        setHouseData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    toggleSearchVisible(false);
    api
      .get(HostURL)
      .then((response) => {
        setHouseData(response.data.current);
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      toggleSearchVisible(true);
    };
  }, []);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
          {houseData.map((house) => (
            <div
              key={house._id}
              className="bg-accent1 shadow-shadow2 rounded-lg overflow-hidden hover:bg-secondary cursor-pointer w-60"
              onClick={() => handleUpdateListing(house._id)}
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
                {house.photos &&
                  house.photos.images &&
                  house.photos.images.map((photo, index) => (
                    <img
                      key={house._id + index}
                      src={photo}
                      alt={house.title}
                      className="w-full h-40 object-cover object-center"
                    />
                  ))}
              </Carousel>
              <div className="p-4 text-accent2">
                <h3 className="text-lg font-semibold mb-2">{house.title}</h3>
                <p className="text-accent2 mb-2">
                  Price per night: ${house.price}
                </p>
                <p className="text-accent2 mb-2">
                  Location: {house.address.address_line1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ListingWizard
        active={wizardVisible}
        mode={isUpdateMode}
        onClose={handleCloseWizard}
        houseDetails={{
          _id: houseDetails ? houseDetails._id : null,
          houseType: houseDetails ? houseDetails.houseType : "",
          houseAddress: houseDetails ? houseDetails.address : "",
          photos: houseDetails
            ? houseDetails.photos
            : {
                main: "",
                images: [],
              },

          features: houseDetails ? houseDetails.features : initialFeatures,
          amenities: houseDetails ? houseDetails.amenities : initialAmenities,
          details: houseDetails
            ? {
                title: houseDetails.title,
                description: houseDetails.description,
                price: houseDetails.price,
              }
            : initialDetails,
          policies: houseDetails ? houseDetails.settings : initialPolicies,
          rules: houseDetails ? houseDetails.rules : initialRules,
        }}
      />
    </div>
  );
};

export default Host;
