import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { Carousel } from "react-responsive-carousel";
import ThemeContext from "../contexts/ThemeContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useContext } from "react";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";
import millify from "millify";

const Map = ({ position, data }) => {
  const { theme } = useContext(ThemeContext);

  const markerSize = 30;
  const marker =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z" /></svg>';
  // const markers = () =>
  //   new L.divIcon({
  //     html: marker,
  //     className: "fill-action",
  //     iconSize: [markerSize, markerSize],
  //     iconAnchor: [markerSize / 2, markerSize / 2],
  //   });

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
      className="h-[82vh] rounded-lg z-10 font-didact"
      dragging={true}
      minZoom={3}
      maxZoom={20}
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

      <MarkerClusterGroup>
        {data.map((house) => (
          <Marker
            key={house.house_id}
            position={[house.latitude, house.longitude]}
            icon={markers(house.price_per_night)}
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
                  <p className="text-accent2 mb-2">
                    Location: {house.location}
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

export default Map;
