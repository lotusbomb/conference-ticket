import React, { useState } from 'react'
import Stepper from './Stepper'
import Ticket from './Ticket';
import Attendee from './Attendee';
import Confirmation from './Confirmation';
// import ParentComponent from './ParentComponent';

const Hero = () => {
    const [formStep, setFormStep] = useState(0)
    // const [ticketData, setTicketData] = useState({type: "", quantity: 1})
    // const [attendeeData, setAttendeeData] = useState({name: "", email: "", photo: "", specialRequest: ""})
    // const completeFormStep = () => {
    //     setFormStep(cur => cur + 1)
    // }


  const nextStep = () => setFormStep((cur) => cur + 1);
  const prevStep = () => setFormStep((cur) => cur - 1);
  const firstStep = () => setFormStep(0)

    
  return (
    <section className='p-5'>
        <div className='max-w-3xl w-full mt-5 rounded-3xl  border-[#197686] border-1 md:mx-auto overflow-hidden z-10'>
            <div className='px-9 py-7'>
                {formStep === 0 && (
                    <div className='md:flex justify-between block'>
                        <p className='text-white text-2xl font-display'>Ticket Selection</p>
                        <p className='text-white'>Step <span>1</span>/3</p>
                    </div>
                )}

                {formStep === 1 && (
                    <div className='md:flex justify-between block'>
                        <p className='text-white text-2xl font-display'>Attendee Details</p>
                        <p className='text-white'>Step <span>2</span>/3</p>
                    </div>
                )}

                {formStep === 2 && (
                    <div className='md:flex justify-between block'>
                        <p className='text-white text-2xl font-display'>Ready</p>
                        <p className='text-white'>Step <span>3</span>/3</p>
                    </div>
                )}
                <Stepper currentStep={formStep + 1} steps={[1, 2, 3]} />
            
            </div>
        
            {formStep === 0 && (
                    <Ticket onNext={nextStep}/>
                    
                )}

            {formStep === 1 && (
                <Attendee onNext={nextStep} onPrev={prevStep}/>        
            )}

            {formStep === 2 && (
                <div className='px-9 py-7'>
                    {/* <div className='md:flex justify-between block'>
                    </div> */}
                <Confirmation onFirst={firstStep} />
                
            </div>
            )}

        </div>
    </section>
  )
}

export default Hero