import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const contactsFilter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const deleteSelectedContact = e => {
    const contactId = e.target.id;
    dispatch(deleteContact(contactId));
  };

  const filterContacts = () => {
    if (contactsFilter === '') {
      return contacts;
    }

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactsFilter.toLowerCase())
    );
    return filteredContacts;
  };

  return (
    <ul>
      {filterContacts().map(contact => {
        return (
          <li key={contact.id}>
            {contact.name}: {contact.number}{' '}
            <button
              id={contact.id}
              onClick={deleteSelectedContact}
              className={css.deleteButton}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
