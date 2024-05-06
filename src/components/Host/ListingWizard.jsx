import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Map from "./Map";
import ThemeContext from "../../contexts/ThemeContext";
import StepOne from "./StepOne";

const ListingWizard = ({ active, mode, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const stepperRef = useRef(null);
  const [houseType, setHouseType] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);

  const validateStepOne = () => {
    const validHouseTypes = [
      "Home",
      "Apartment",
      "Condo",
      "Townhouse",
      "Duplex",
      "Mobile Home",
      "Cabin",
      "Loft",
      "Studio",
      "Other",
    ];
    return (
      houseType !== "" &&
      validHouseTypes.includes(houseType) &&
      houseAddress &&
      typeof houseAddress === "object" &&
      houseAddress.housenumber &&
      houseAddress.street &&
      houseAddress.city &&
      houseAddress.state &&
      houseAddress.postcode
    );
  };

  const stepTwo = () => <div>Step Two</div>;
  const steps = [
    {
      header: "Details",
      body: (
        <StepOne
          houseType={houseType}
          setHouseType={setHouseType}
          houseAddress={houseAddress}
          setHouseAddress={setHouseAddress}
          addressOptions={addressOptions}
          setAddressOptions={setAddressOptions}
        />
      ),
      hasNextStep: true,
      hasPreviousStep: false,
      validate: validateStepOne,
    },
    {
      header: "Features",
      body: stepTwo(),
      hasNextStep: false,
      hasPreviousStep: true,
    },
  ];

  useEffect(() => {
    return () => {
      setHouseType("");
      setHouseAddress("");
    };
  }, []);

  return (
    <Dialog
      header={mode}
      visible={active}
      style={{ width: "75vw", height: "75vh" }}
      onHide={onClose}
      className="font-didact bg-accent1"
    >
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

export default ListingWizard;
