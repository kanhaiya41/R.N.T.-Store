import React from 'react'
import Navbar from './Navbar'

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <div className="image-slider">
        <div className="image-container">
          <img src="./img/rnt2.jpeg" alt="Image 1" className="slider-image" />
          <img src="./img/rnt3.jpg" alt="Image 2" className="slider-image" />
          <img src="./img/rnt1.jpg" alt="Image 3" className="slider-image" />
        </div>
        <div className="overlay-text">
          <h2>R.N.T PG College,Kapasan</h2>
        </div>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.6252333038683!2d74.30022727515251!3d24.876646277918805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396881656b78253b%3A0x5a1c594872fad0fd!2sRNT%20PG%20COLLEGE%20KAPASAN!5e0!3m2!1sen!2sin!4v1722499624445!5m2!1sen!2sin"
        width="100%" height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
        
        <h2 className='CI'>Contact Information</h2> <br />
      <div className='CIFLEXBOX'>
        <div className='CIBox'>
          <img src="/img/call.jpeg" alt="phone" className='call' />  <hr />
          Phone: <br />
          +91 9509346008 <br />
          +91 7742936692
        </div> <br />
        <div className='CIBox'>
          <img src="/img/mail.png" alt="phone" className='call' />  <hr />
          Gmails: <br />
          kingkanhaiya57@gmail.com <br />
          bhaveshvyas45@gmail.com
        </div> <br />
        <div className='CIBox'>
          <img src="/img/msj.png" alt="phone" className='call' />  <hr />
          Message Now: <br />
          +91 7742936692 <br />
          +91 5236497584
        </div>
      </div>
    </div>
  )
}

export default ContactUs
