import { Modal } from 'react-bootstrap';

const ContactDetailModal = ({ show, onHide, contact }) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contact?.id ? (
          <div>
            <p>ID: {contact.id}</p>
            <p>Phone: {contact.phone}</p>
            <p>Country: {contact.country.name}</p>
          </div>
        ) : (
          <p>No contact details available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ContactDetailModal;
