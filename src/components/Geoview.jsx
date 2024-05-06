import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Carousel } from "react-responsive-carousel";
import ThemeContext from "../contexts/ThemeContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useContext } from "react";
import "leaflet/dist/leaflet.css";
import millify from "millify";
import PropTypes from "prop-types";

const Geoview = ({ position, data }) => {
  const { theme } = useContext(ThemeContext);

  const markers = (price) => {
    return new L.divIcon({
      html: `<div>$${millify(price)}</div>`,
      className:
        "bg-primary text-accent1 flex justify-content items-center w-full rounded-3xl font-extrabold font-comic p-2 hover:bg-action",
      iconSize: [45, 30],
      iconAnchor: [22.5, 5],
    });
  };

  return (
    <MapContainer
      zoomControl={true}
      className="h-[92vh] z-10 font-didact"
      dragging={true}
      minZoom={3}
      maxZoom={17}
      zoom={10}
      center={position}
    >
      <TileLayer
        url={
          theme === "light"
            ? "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        }
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
      />

      <MarkerClusterGroup chunkedLoading>
        {data.map((house) => (
          <Marker
            key={house._id}
            position={[
              house.address.location.coordinates[1],
              house.address.location.coordinates[0],
            ]}
            icon={markers(house.price)}
          >
            <Popup>
              <div
                key={house.house_id}
                className="bg-accent1 shadow-shadow2 rounded-lg overflow-hidden hover:bg-secondary h-full w-full cursor-pointer font-didact"
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
                        className="w-full h-60 object-cover object-center"
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
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

Geoview.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      address: PropTypes.shape({
        location: PropTypes.shape({
          coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        }).isRequired,
        address_line1: PropTypes.string.isRequired,
      }).isRequired,
      photos: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string),
      }),
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Geoview;
