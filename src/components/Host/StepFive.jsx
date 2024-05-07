import { useCallback, useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Dialog } from "primereact/dialog";
import ListingPreview from "./ListingPreview";
import { NotificationContext } from "../../contexts/NotificationContext";
import PropTypes from "prop-types";
import api, { HostURL } from "../../api";

const StepFive = ({ house, accept, mode }) => {
  const [preview, setPreview] = useState(false);
  const { showToast } = useContext(NotificationContext);

  const handlePublish = useCallback(() => {
    api
      .request({
        method: mode ? "PUT" : "POST",
        url: `${HostURL}${mode ? `${house._id}` : ""}`,
        data: {
          houseType: house.houseType,
          address: house.address,
          features: house.features,
          amenities: house.amenities,
          settings: {
            cancellationDays: 7,
            cancellationPercent: 50,
            changeDays: 7,
          },
          rules: house.rules,
          photos: house.photos,
          title: house.title,
          description: house.description,
          price: house.price,
          currency: "USD",
        },
      })
      .then(() => {
        showToast("success", house.houseType, `Successfully Published!`);
        accept();
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    accept,
    house._id,
    house.address,
    house.amenities,
    house.description,
    house.features,
    house.houseType,
    house.photos,
    house.price,
    house.rules,
    house.title,
    mode,
    showToast,
  ]);

  return (
    <div className="flex w-full mx-16 justify-center items-center">
      <div className="bg-accent1 shadow-shadow2 rounded-lg overflow-hidden w-1/3">
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
            house.photos.images.map((photo, index) => (
              <>
                <button
                  className="flex justify-center items-center shadow-shadow1 absolute top-2 left-2 bg-accent1 rounded-lg hover:bg-action hover:text-accent1 p-1 transition duration-300"
                  onClick={() => setPreview(true)}
                >
                  <i className="pi pi-eye mr-1" style={{ fontSize: "1rem" }} />
                  <span>Show Preview</span>
                </button>
                <img
                  key={index}
                  src={photo}
                  alt={house.title}
                  className="w-full h-72 object-cover object-center"
                />
              </>
            ))}
        </Carousel>
        <div className="p-4 text-accent2">
          <h3 className="text-lg font-semibold mb-2">{house.title}</h3>
          <p className="text-accent2 mb-2">Price per night: ${house.price}</p>
          <p className="text-accent2 mb-2">Location: {house.address.street}</p>
        </div>
      </div>
      <div className="p-4 text-accent2">
        <h2 className="text-2xl font-semibold mb-2">What&apos;s next?</h2>
        <p className="text-accent2 mb-2">Publish your listing</p>
        <p className="text-accent2 mb-2">Wait for approval</p>
        <p className="text-accent2 mb-2">Get ready for hosting success</p>
        <button
          className={`text-primary rounded-lg ml-auto p-6 text-xl border-2 border-primary  hover:bg-primary hover:text-accent1`}
          onClick={() => handlePublish()}
        >
          {mode ? "Update" : "Publish"}
        </button>
      </div>
      <Dialog
        header={"Preview"}
        visible={preview}
        onHide={() => setPreview(false)}
        style={{ width: "70vw", height: "70vh" }}
        className="font-didact bg-accent1 overflow"
      >
        <ListingPreview house={house} />
      </Dialog>
    </div>
  );
};

StepFive.propTypes = {
  mode: PropTypes.bool.isRequired,
  house: PropTypes.shape({
    _id: PropTypes.string,
    houseType: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postcode: PropTypes.string,
      country: PropTypes.string.isRequired,
    }).isRequired,
    features: PropTypes.object.isRequired,
    amenities: PropTypes.object.isRequired,
    rules: PropTypes.object.isRequired,
    photos: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  accept: PropTypes.func.isRequired,
};

export default StepFive;
