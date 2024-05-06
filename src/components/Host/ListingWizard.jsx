import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useCallback, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  initialFeatures,
  initialAmenities,
  initialDetails,
  initialPolicies,
  initialRules,
  validHouseTypes,
} from "../../constants";
import PropTypes from "prop-types";

const ListingWizard = ({ active, mode, onClose }) => {
  const stepperRef = useRef(null);
  const [houseType, setHouseType] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [photos, setPhotos] = useState({
    main: "",
    images: [],
  });
  const [features, setFeatures] = useState(initialFeatures);
  const [amenities, setAmenities] = useState(initialAmenities);
  const [details, setDetails] = useState(initialDetails);
  const [policies, setPolicies] = useState(initialPolicies);
  const [rules, setRules] = useState(initialRules);

  const handleFeatureChange = (feature, value) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: value,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [amenity]: !prevAmenities[amenity],
    }));
  };

  const validateStepOne = () => {
    return (
      houseType !== "" &&
      validHouseTypes.includes(houseType) &&
      houseAddress &&
      typeof houseAddress === "object" &&
      houseAddress.housenumber &&
      houseAddress.street &&
      houseAddress.city &&
      houseAddress.state
    );
  };

  const validateStepThree = () => {
    return (
      photos &&
      typeof photos === "object" &&
      photos.main &&
      photos.images &&
      typeof photos.images === "object" &&
      photos.images.length > 2
    );
  };
  const validateStepFour = () => {
    return (
      details &&
      typeof details === "object" &&
      details.price &&
      details.description &&
      details.title &&
      details.description.trim() &&
      details.title.trim()
    );
  };

  const accept = useCallback(() => {
    onClose();
    setHouseType("");
    setHouseAddress("");
    setPhotos({
      main: "",
      images: [],
    });
    setFeatures(initialFeatures);
    setAmenities(initialAmenities);
    setDetails(initialDetails);
    setPolicies(initialPolicies);
    setRules(initialRules);
  }, [onClose]);

  const reject = () => {};

  const handleClose = useCallback(() => {
    confirmDialog({
      message:
        "Are you sure you want to close the Listing Wizard? Any information you've added will be lost.",
      header: "Confirm Action",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName:
        "text-error rounded-lg ml-2 p-2 border-2 border-error  hover:bg-error hover:text-accent1",
      rejectClassName:
        "text-primary rounded-lg p-2 border-2 border-primary  hover:bg-primary hover:text-accent1",
      accept,
      reject,
    });
  }, [accept]);

  const steps = [
    {
      header: "Address",
      body: (
        <StepOne
          houseType={houseType}
          setHouseType={setHouseType}
          houseAddress={houseAddress}
          setHouseAddress={setHouseAddress}
        />
      ),
      hasNextStep: true,
      hasPreviousStep: false,
      validate: validateStepOne,
    },
    {
      header: "Features",
      body: (
        <StepTwo
          features={features}
          handleFeatureChange={handleFeatureChange}
          amenities={amenities}
          handleAmenityToggle={handleAmenityToggle}
        />
      ),
      hasNextStep: true,
      hasPreviousStep: true,
    },
    {
      header: "Images",
      body: <StepThree photos={photos} setPhotos={setPhotos} />,
      hasNextStep: true,
      hasPreviousStep: true,
      validate: validateStepThree,
    },
    {
      header: "Details & Policies",
      body: (
        <StepFour
          details={details}
          setDetails={setDetails}
          rules={rules}
          setRules={setRules}
          policies={policies}
          setPolicies={setPolicies}
        />
      ),
      hasNextStep: true,
      hasPreviousStep: true,
      validate: validateStepFour,
    },
    {
      header: "Publish",
      body: (
        <StepFive
          accept={accept}
          house={{
            houseType,
            photos,
            title: details.title,
            price: details.price,
            description: details.description,
            currency: "USD",
            address: {
              country: houseAddress.country,
              country_code: houseAddress.country_code,
              state: houseAddress.state,
              county: houseAddress.county,
              city: houseAddress.city,
              postcode: houseAddress.postcode,
              street: houseAddress.street,
              housenumber: houseAddress.housenumber,
              location: {
                type: "Point",
                coordinates: [houseAddress.lon, houseAddress.lat],
              },
              state_code: houseAddress.state_code,
              result_type: houseAddress.result_type,
              formatted: houseAddress.formatted,
              address_line1: houseAddress.address_line1,
              address_line2: houseAddress.address_line2,
            },
            features,
            amenities,
            settings: policies,
            rules,
          }}
        />
      ),
      hasNextStep: false,
      hasPreviousStep: true,
    },
  ];

  return (
    <Dialog
      header={mode}
      visible={active}
      style={{ width: "85vw", height: "85vh" }}
      onHide={() => handleClose()}
      className="font-didact bg-accent1 overflow"
    >
      <ConfirmDialog />
      <Stepper ref={stepperRef} linear>
        {steps &&
          steps.map((step) => (
            <StepperPanel key={step.header} header={step.header}>
              <div className="flex flex-column h-12rem">
                <div className="flex-auto flex justify-center items-center font-medium">
                  {step.body}
                </div>
              </div>
              <div className="flex pt-4 justify-between space-x-4">
                <Button
                  label="Back"
                  hidden={!step.hasPreviousStep}
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  className="text-primary rounded-lg p-2 border-2 border-primary hover:bg-primary hover:text-accent1"
                  onClick={() => stepperRef.current.prevCallback()}
                />
                <div className="flex-grow"></div>{" "}
                <div className="flex items-center space-x-4">
                  <Button
                    hidden={!step.hasNextStep}
                    label="Next"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    className="text-primary rounded-lg p-2 border-2 border-primary hover:bg-primary hover:text-accent1"
                    onClick={() => {
                      const isValid = step.validate ? step.validate() : true;
                      if (isValid) {
                        stepperRef.current.nextCallback();
                      }
                    }}
                    disabled={
                      !step.hasNextStep || (step.validate && !step.validate())
                    }
                  />
                </div>
              </div>
            </StepperPanel>
          ))}
      </Stepper>
    </Dialog>
  );
};

ListingWizard.propTypes = {
  active: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ListingWizard;
