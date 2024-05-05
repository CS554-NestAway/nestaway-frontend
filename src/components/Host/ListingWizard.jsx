import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

const ListingWizard = ({ active, mode, onClose }) => {
  const stepperRef = useRef(null);
  const [houseType, setHouseType] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const stepOne = () => (
    <div className="flex-col">
      <Dropdown
        value={houseType}
        options={[
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
        ]}
        onChange={(e) => setHouseType(e.value)}
        placeholder="Select House Type"
      />
      <input
        type="text"
        value={houseAddress}
        onChange={(e) => setHouseAddress(e.target.value)}
        placeholder="Enter House Address"
      />
    </div>
  );
  const stepTwo = () => <div>Step Two</div>;
  const steps = [
    {
      header: "House Details",
      body: stepOne(),
      hasNextStep: true,
      hasPreviousStep: true,
    },
    {
      header: "HouseAddress",
      body: stepTwo(),
      hasNextStep: false,
      hasPreviousStep: true,
    },
  ];

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
              <div className="flex pt-4 justify-content-end space-x-4">
                <Button
                  label="Back"
                  hidden={!step.hasPreviousStep}
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  className="text-primary rounded-lg ml-auto p-2 border-2 border-primary  hover:bg-primary hover:text-accent1"
                  onClick={() => stepperRef.current.prevCallback()}
                />
                <Button
                  hidden={!step.hasNextStep}
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  className="text-primary rounded-lg ml-auto p-2 border-2 border-primary  hover:bg-primary hover:text-accent1"
                  onClick={() => stepperRef.current.nextCallback()}
                />
              </div>
            </StepperPanel>
          ))}
      </Stepper>
    </Dialog>
  );
};

export default ListingWizard;
