import React from 'react'
import { FaEnvelope, FaPhoneAlt, FaInstagram, FaFacebook, FaWhatsapp, FaHeart } from 'react-icons/fa'

function Footer() {
  return (
    <div className='bg-primary text-light p-5'>
      <div className='row'>
        <div className='col-md-6'>
          <h5>AI rBuilder</h5>
          <p style={{textAlign:'justify'}} className='mt-3'>
            An AI rBuilder suggest job specific keywords, professional summaries, and skill recommendations to make the resume more effective and ATS (Applicant Tracking System) friendly. The main goal of the AI Powered Resume Builder is to simplify the resume creation process and help job seekers build professional, well-structured resumes in a few minutes.
          </p>
        </div>

        <div className='col-md-2'></div>

        <div className='col-md-4'>
          <h5>Contact Us</h5>
          <p className='mt-3'><FaEnvelope className='me-2' />resumebuilder@gmail.com</p>
          <p><FaPhoneAlt className='me-2' />9087654321</p>
          <h5 className='mt-4'>Connect With Us</h5>
          <div className='d-flex mt-3'>
            <a href='https://www.instagram.com' target='_blank' rel='noreferrer' className='text-light me-3'><FaInstagram size={22} /></a>
            <a href='https://www.facebook.com' target='_blank' rel='noreferrer' className='text-light me-3'><FaFacebook size={22} /></a>
            <a href='https://www.whatsapp.com' target='_blank' rel='noreferrer' className='text-light'><FaWhatsapp size={22} /></a>
          </div>
        </div>
      </div>

      <div className='text-center mt-4'>
        Designed & built with <FaHeart className='text-danger mx-1' /> using React
      </div>
    </div>
  )
}

export default Footer