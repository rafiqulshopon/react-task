import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ContactModal from './ContactModal';

const apiBaseURL = 'https://contact.mediusware.com/api/';

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUS, setIsUS] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchContacts = useCallback(async (isUS = false) => {
    setLoading(true);
    try {
      const url = isUS
        ? `${apiBaseURL}country-contacts/united%20states/`
        : `${apiBaseURL}contacts/`;
      const { data } = await axios.get(url);
      setContacts(data.results || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleShowModal = (us) => {
    setIsUS(us);
    fetchContacts(us);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleScrollToEnd = () => {};

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
        <div className='d-flex justify-content-center gap-3'>
          <Button
            onClick={() => handleShowModal(false)}
            variant='outline-primary'
          >
            All Contacts
          </Button>
          <Button
            onClick={() => handleShowModal(true)}
            variant='outline-warning'
          >
            US Contacts
          </Button>
        </div>
      </div>
      <ContactModal
        show={showModal}
        onHide={handleHideModal}
        contacts={contacts}
        onScrollToEnd={handleScrollToEnd}
        isUS={isUS}
        loading={loading}
      />
    </div>
  );
};

export default Problem2;
