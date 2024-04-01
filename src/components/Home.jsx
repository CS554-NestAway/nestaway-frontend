import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { houseData } from "./sample";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [distances, setDistances] = useState({});

  const getDistance = async (nestLat, nestLong) => {
    const waypoints = `${position.latitude},${position.longitude}|${nestLat},${nestLong}`;
    const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&units=imperial&apiKey=6ce0477b523f47759dbad5b68b1efe77`;

    try {
      const response = await axios.get(url);
      const distance = response.data.features[0].properties.distance + " miles";
      return distance;
    } catch (error) {
      console.error("Error fetching distance:", error);
      return "N/A";
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ latitude, longitude });
      });
    }
  }, []);

  const calculateDistance = useCallback(
    async (nestLat, nestLong) => {
      const earthRadiusMiles = 3958.8; // Earth's radius in miles

      const dLat = toRadians(nestLat - position.latitude);
      const dLon = toRadians(nestLong - position.longitude);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(position.latitude)) *
          Math.cos(toRadians(nestLat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadiusMiles * c;
      return Math.ceil(distance);
    },
    [position.latitude, position.longitude]
  );

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  useEffect(() => {
    const fetchDistances = async () => {
      const distances = {};
      for (const house of houseData) {
        if (position.latitude && position.longitude) {
          const distance = await calculateDistance(
            house.latitude,
            house.longitude
          );
          distances[house.house_id] = distance;
        }
      }
      setDistances(distances);
    };

    fetchDistances();
  }, [calculateDistance, position.latitude, position.longitude]);

  return (
    <>
      <div className="flex w-full h-full justify-center items-center my-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {houseData.map((house) => (
          <div
            key={house.house_id}
            className="bg-accent1 shadow-shadow2 rounded-lg overflow-hidden hover:bg-secondary cursor-pointer"
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
              {/* {position.latitude && position.longitude && (
                <p className="text-accent2 mb-2">
                  Distance: {calculateDistance(house.latitude, house.longitude)}{" "}
                  miles
                </p>
              )} */}
              {distances[house.house_id] && (
                <p className="text-accent2 mb-2">
                  Distance: {distances[house.house_id]} miles
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
