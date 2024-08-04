import React, { useState, useEffect, useRef } from 'react';
import './test.css';
import Modal from '../modal/modal.js';

const initialNewsletterModalData = {
  email: '',
  digestType: 'weekly',
};

const NewsletterModal = ({ onSubmit, isOpen, onClose }) => {
  const focusInputRef = useRef(null);
  const [formState, setFormState] = useState(initialNewsletterModalData);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
    setFormState(initialNewsletterModalData);
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            ref={focusInputRef}
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="digestType">Digest Type</label>
          <select
            id="digestType"
            name="digestType"
            value={formState.digestType}
            onChange={handleInputChange}
            required
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="form-row">
          <button type="submit">Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewsletterModal;
