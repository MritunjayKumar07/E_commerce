import React from 'react';
import { TCSdata } from '../server/ApiTCS';

const Testimonial = ({ name, title, description, image, quotes }) => (
  <div className="testimonial-card">
    <img src={image} alt={name} className="testimonial-banner" width="80" height="80" />
    <p className="testimonial-name">{name}</p>
    <p className="testimonial-title">{title}</p>
    <img src={quotes} alt="quotation" className="quotation-img" width="26" />
    <p className="testimonial-desc">{description}</p>
  </div>
);

const CTA = ({ banner, discount, title, text, buttonText }) => (
  <div className="cta-container">
    <img src={banner} alt="summer collection" className="cta-banner" />
    <a href="#" className="cta-content">
      <p className="discount">{discount}</p>
      <h2 className="cta-title">{title}</h2>
      <p className="cta-text">{text}</p>
      <button className="cta-btn">{buttonText}</button>
    </a>
  </div>
);

const Service = ({ icon, title, description }) => (
  <a href="#" className="service-item">
    <div className="service-icon">
      <ion-icon name={icon}></ion-icon>
    </div>
    <div className="service-content">
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
    </div>
  </a>
);

// Main component
const DynamicContent = () => (
  <div>
    <div className="container">
      <div className="testimonials-box">
        {/* Testimonials */}
        <div className="testimonial">
          <h2 className="title">Testimonials</h2>
          {TCSdata.testimonials.map((testimonial) => (
            <Testimonial key={testimonial.id} {...testimonial} />
          ))}
        </div>

        {/* CTA */}
        <CTA {...TCSdata.cta} />

        {/* Services */}
        <div className="service">
          <h2 className="title">Our Services</h2>
          <div className="service-container">
            {TCSdata.services.map((service, index) => (
              <Service key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DynamicContent;
