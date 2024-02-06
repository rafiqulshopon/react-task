import React from 'react';
import { Modal, Spinner, Button, Form, Table } from 'react-bootstrap';

const ContactModal = ({
  show,
  onHide,
  contacts,
  isUS,
  loading,
  onCheckboxChange,
  onlyEven,
  onContactClick,
}) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isUS ? 'US Contacts' : 'All Contacts'}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`d-flex ${
          loading ? 'justify-content-center align-items-center' : ''
        }`}
        style={{ overflowY: 'auto' }}
      >
        {loading ? (
          <Spinner animation='border' />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Phone</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => onContactClick(contact)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country ? contact.country.name : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Form.Check
          type='checkbox'
          label='Only even'
          checked={onlyEven}
          onChange={onCheckboxChange}
          className='me-auto'
        />
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
