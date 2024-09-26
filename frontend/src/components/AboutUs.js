import React from 'react'
import Navbar from './Navbar'

const AboutUs = () => {
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
          <h2>About Us</h2>
        </div>
      </div>
      <div className='aboutclg'>
        <h2>Our <span style={{color:'#0d6c7f'}}>College</span></h2>
        <p>Ravindranath Tagore (RNT) P. G. College Kapasan, is the first Self Financed College in the District of Chittorgarh, established in the year 2002. We are also recognized by the UGC under the Section 2(f) and 12(B), with permanent affiliation of the Mohanlal Sukhadia University (State Govt NAAC A Grade University), apart from that we also fall under the Section 2(g) of the National Commission for Minority Education Institutions Act (2004).</p>
      </div>
      <div className='eduquality'>
        <h1>Delivering The Quality Education Over 21 Years</h1>
        <p>We are the leading academic institution offering different programs and higher education diplomas that are designed with global requirements in mind. Each year, over 1000+ students graduates from our institution. We are the number 1 institution in the country and we are providing the quality education with more that 21 years.</p>
      </div>
    </div>
  )
}

export default AboutUs
