import React, { useState } from 'react'

const Stepper = ({currentStep, steps}) => {
return (
  <div className="w-full max-w-full mx-auto pt-4">
    {/* Step Progress Indicator */}
    <div className="relative w-full h-2 bg-[#07373F] rounded-full overflow-hidden">
      <div
        className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#197686] to-[#197686] transition-all duration-500`}
        style={{
          width: `${(currentStep / steps.length) * 100}%`,
        }}
      ></div>
    </div>
  </div>
);

};

export default Stepper