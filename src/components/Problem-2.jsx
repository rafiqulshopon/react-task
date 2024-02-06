import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ContactModal from './ContactModal';
import ContactDetailModal from './ContactDetailModal';

const apiBaseURL = 'https://contact.mediusware.com/api/';

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUS, setIsUS] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchContacts = useCallback(
    async (country = '', newPage = 1) => {
      if (!hasMore) return;

      try {
        const url = `${apiBaseURL}${
          country ? `country-contacts/united%20states/` : `contacts/`
        }?page=${newPage}`;
        const { data } = await axios.get(url);

        if (onlyEven) {
          setContacts((prevContacts) => [
            ...prevContacts,
            ...data.results.filter((c) => c.id % 2 === 0),
          ]);
        } else {
          setContacts((prevContacts) => [...prevContacts, ...data.results]);
        }

        setHasMore(data.next != null);
        setPage(newPage + 1);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    },
    [onlyEven, hasMore]
  );

  const handleShowModal = (us) => {
    setLoading(true);
    setIsUS(us);
    fetchContacts(us);
    setShowModal(true);
    const newUrl = us ? '#USContacts' : '#AllContacts';
    window.history.pushState({}, '', newUrl);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setContacts([]);
    setLoading(true);
    window.history.pushState({}, '', window.location.pathname);
  };

  const toggleEvenFilter = () => {
    setOnlyEven(!onlyEven);
  };

  const handleShowDetailModal = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  const handleHideDetailModal = () => {
    setSelectedContact({});
    setShowDetailModal(false);
  };

  const switchContacts = (usOnly) => {
    setIsUS(usOnly);
    fetchContacts(usOnly ? 'united states' : '');
  };

  useEffect(() => {
    fetchContacts(isUS);
  }, [onlyEven, isUS]);

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
        isUS={isUS}
        loading={loading}
        onCheckboxChange={toggleEvenFilter}
        onlyEven={onlyEven}
        onContactClick={handleShowDetailModal}
        switchContacts={switchContacts}
        fetchMoreData={() => fetchContacts(isUS ? 'united states' : '', page)}
        hasMore={hasMore}
      />

      <ContactDetailModal
        show={showDetailModal}
        onHide={handleHideDetailModal}
        contact={selectedContact}
      />
    </div>
  );
};

export default Problem2;
