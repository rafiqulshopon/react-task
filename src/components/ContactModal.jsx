import { Modal, Spinner } from 'react-bootstrap';

const ContactModal = ({
  show,
  onHide,
  contacts,
  onScrollToEnd,
  isUS,
  loading,
}) => {
  return (
    <Modal show={show} onHide={onHide} onScroll={onScrollToEnd}>
      <Modal.Header closeButton>
        <Modal.Title>{isUS ? 'US Contacts' : 'All Contacts'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {loading ? (
          <div className='d-flex justify-content-center'>
            <Spinner animation='border' />
          </div>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Phone</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
