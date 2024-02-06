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
  switchContacts,
}) => {
  const handleSwitchContacts = (usOnly) => {
    switchContacts(usOnly);
    const newUrl = usOnly ? '#USContacts' : '#AllContacts';
    window.history.pushState({}, '', newUrl);
  };

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isUS ? 'US Contacts' : 'All Contacts'}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`${
          loading ? 'd-flex justify-content-center align-items-center' : ''
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
        <Button
          style={{ backgroundColor: '#46139f', color: '#fff' }}
          onClick={() => handleSwitchContacts(false)}
        >
          All Contacts
        </Button>
        <Button
          style={{ backgroundColor: '#ff7f50', color: '#fff' }}
          onClick={() => handleSwitchContacts(true)}
        >
          US Contacts
        </Button>
        <Button
          variant='outline-primary'
          style={{ borderColor: '#46139f', color: '#46139f' }}
          onClick={onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
