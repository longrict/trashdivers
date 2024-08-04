import React, { useState, useEffect, useRef } from 'react';
import './marker_modal.css';
import Modal from '../modal/modal.js';

const initialMarkerModalData = {
  notes: '',
  garbageType: 'litter',
};

const MarkerModal = ({ onSubmit, isOpen, onClose }) => {
  const focusInputRef = useRef(null);
  const [formState, setFormState] = useState(initialMarkerModalData);

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
    setFormState(initialMarkerModalData);
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="notes">Notes?</label>
          <input
            ref={focusInputRef}
            type="notes"
            id="notes"
            name="notes"
            value={formState.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="garbageType">Garbage type</label>
          <select
            id="garbageType"
            name="garbageType"
            value={formState.garbageType}
            onChange={handleInputChange}
            required
          >
            <option value="litter">Litter</option>
            <option value="eWaste">E-waste</option>
            <option value="tripHazard">Tripping hazard</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="isThere">Still there?</label>
          <select
            id="isThere"
            name="isThere"
            value={formState.isThere}
            onChange={handleInputChange}
            required
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-row">
          <button type="submit">Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default MarkerModal;
