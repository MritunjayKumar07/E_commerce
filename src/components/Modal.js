import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { TCSdata } from '../server/ApiTCS';

const Contant = ({ closeModal, setCloseModal, banner, title, desc, btn, path }) => {
  return (
    <div className="modal-content">
      <button
        className="modal-close-btn"
        data-modal-close
        onClick={() => setCloseModal(!closeModal)}
      >
        <GrClose name="close-outline" />
      </button>

      <div className="newsletter-img">
        <img src={banner} alt="subscribe newsletter" width="400" height="400" />
      </div>

      <div className="newsletter">
        <form action="#">
          <div className="newsletter-header">
            <h3 className="newsletter-title">{title}</h3>
            <p className="newsletter-desc">{desc}</p>
          </div>

          <input
            type="email"
            name="email"
            className="email-field"
            placeholder="Email Address"
            required
          />
          <button type="submit" className="btn-newsletter">
            {btn}
          </button>
        </form>
      </div>
    </div>
  );
};


export default function Modal() {
  const [closeModal, setCloseModal] = useState(true);

  return (
    closeModal ? (
      <div className="modal" data-modal>
        <div className="modal-close-overlay" data-modal-overlay></div>
        <Contant closeModal={closeModal} setCloseModal={setCloseModal} {...TCSdata.modal}/>
      </div>
    ) : null
  );
}
