import { usePolicy } from '../context/PolicyContext';
import ChooseTemplate from '../pages/ChooseTemplate';
import NamePolicy from '../pages/NamePolicy';
import ChooseLocations from '../pages/ChooseLocations';
import DefineRules from '../pages/DefineRules';
import ConfigureNotifications from '../pages/ConfigureNotifications';
import ReviewAndCreate from '../pages/ReviewAndCreate';

const STEPS = [
  { label: 'Template', component: ChooseTemplate },
  { label: 'Name', component: NamePolicy },
  { label: 'Locations', component: ChooseLocations },
  { label: 'Rules', component: DefineRules },
  { label: 'Notifications', component: ConfigureNotifications },
  { label: 'Review', component: ReviewAndCreate },
];

export default function PolicyWizard() {
  const { currentStep, setCurrentStep, totalSteps } = usePolicy();
  const StepComponent = STEPS[currentStep].component;

  return (
    <div className="wizard">
      <nav className="wizard-nav">
        {STEPS.map((step, i) => (
          <button
            key={step.label}
            className={`wizard-step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
            onClick={() => setCurrentStep(i)}
          >
            <span className="step-number">{i + 1}</span>
            <span className="step-label">{step.label}</span>
          </button>
        ))}
      </nav>

      <main className="wizard-content">
        <StepComponent />
      </main>

      <footer className="wizard-footer">
        <button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
          Back
        </button>
        <span>{currentStep + 1} of {totalSteps}</span>
        {currentStep < totalSteps - 1 && (
          <button className="btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
            Next
          </button>
        )}
      </footer>
    </div>
  );
}
