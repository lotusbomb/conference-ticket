import React, { useState } from 'react'
import Tickets from "../public/images/TICKET.svg"
import Barcode from 'react-barcode'

// eslint-disable-next-line react/prop-types
const Confirmation = ({onFirst}) => {

  const userName = localStorage.getItem("userName") || "N/A";
  const userEmail = localStorage.getItem("userEmail") || "N/A";
  const specialRequest = localStorage.getItem("specialRequest") || "Nil";
  const selectedTicket = localStorage.getItem("selectedTicket") || "Nil";
  const ticketQuantity = Number(localStorage.getItem("ticketQuantity")) || 1;
  const userAvatar = localStorage.getItem("avatar") || null;



  return (
    <section className='items-center text-white '>
      <div className='rounded-3xl max-w-2xl w-full mt-5 p-6  mx-auto overflow-hidden z-10'>

          <h1 className='text-3xl font-bold mt-9 text-center'>Your Ticket is Booked!</h1>
          <p className='mt-5 text-xl text-center'>You can download or Check your email for a copy</p>

          <div className=' w-full mt-4'>
              <div className='text-white flex flex-col items-center'>
                <img src={Tickets} alt="ticket" className=''/>
              <div className='absolute top-50 left-0 w-full h-full flex flex-col justify-center items-center text-white'>
                <div className=' '>
                  <p className="font-game text-[40px] text-center text-white mt-12">Techember Fest &#34;25
                  </p>
                  <p className='text-[11px] text-center'>📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p className='text-[11px] mt-1 text-center'>📅 February 14, 2025 | 7:00PM</p>

                  {userAvatar ? (
                    <div className='mt-3'>
                      <img src={userAvatar} alt="avatar" className='w-16 rounded-full object-cover border-2 border-[#197686]'/>
                      <p>Avatar Loaded Successfully</p>
                    </div>
                  ) : (
                    <p>No Avatar Found</p>
                  )}

                  <div className='border-[#07373F] border-2 mt-15 rounded-2xl w-[240px]'>
                    <div className='grid grid-cols-2 p-2'>
                      <div className='leading-[2] border-b border-r border-gray-600'>
                        <p className='font-thin text-gray-500 text-[10px]'>Enter your name</p>
                        <p className='font-bold text-[10px]'>{userName}</p>
                      </div>

                      <div className='leading-[2] border-b border-gray-600'>
                        <p className=' ml-2 font-thin text-gray-500 text-[10px]'>Enter your email *</p>
                        <p className='ml-2 font-bold text-[8px]'>{userEmail}</p>
                      </div>

                      <div className='leading-[2] border-r border-b border-gray-600'>
                        <p className='font-thin text-gray-500 text-[10px]'>Ticket Type:</p>
                        <p className='font-bold text-[10px]'>{selectedTicket}</p>
                      </div>

                      <div className='leading-[2] border-b border-gray-600'>
                        <p className='font-thin text-gray-500 text-[10px] ml-2'>Ticket for:</p>
                        <p className='font-bold text-[10px] ml-2'>{ticketQuantity}</p>
                      </div>
                    </div>

                    <div className='leading-[1.5] p-2'>
                      <p className='font-thin text-[13px] text-gray-500'>Special request?</p>
                      <p className='text-[12px] mt-2'>{specialRequest}</p>
                    </div>
                </div>
                </div>
                </div>
                <div>
                <div className="-mt-22">
                  <Barcode value="123456789012" height={50} displayValue={false} lineColor='#fff' background="transparent" />
                </div>
                </div>
            </div>
          </div>
          <div className='mt-9 items-center text-center md:flex gap-5 grid'>
            <button onClick={onFirst} className='border-[#197686] border-2 w-full font-display text-sm md:text-[17px] capitalize p-2 rounded-lg text-white hover:bg-[#197686] hover:cursor-pointer'
            >Book Another Ticket</button>
            <button className='border-[#197686] border-2 font-display w-full text-sm md:text-[17px] capitalize text-white rounded-lg p-2 hover:bg-[#197686] hover:cursor-pointer'>Download Ticket</button>
        </div>
      </div>

    </section>
  )
}

export default Confirmation
