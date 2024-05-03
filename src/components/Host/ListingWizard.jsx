import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const ListingWizard = ({ active, mode, onClose }) => {
  const stepperRef = useRef(null);
  const stepOne = () => <div>Step One</div>;
  const stepTwo = () => <div>Step Two</div>;
  const steps = [
    {
      header: "HouseStructure",
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
                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
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
