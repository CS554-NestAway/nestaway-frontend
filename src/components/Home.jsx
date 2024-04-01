import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import { houseData } from "./sample";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  houseData;
  return (
    <>
      <div className="flex w-full h-full justify-center items-center my-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {houseData.map((house) => (
          <div
            key={house.house_id}
            className="bg-accent1 shadow-shadow3 rounded-lg overflow-hidden hover:bg-secondary cursor-pointer"
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
                    className="w-full h-60 object-cover object-center"
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
    </>
  );
};

export default Home;
