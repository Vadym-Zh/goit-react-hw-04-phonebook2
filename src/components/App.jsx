import { useState, useEffect } from 'react';
import initialContacts from '../data/contacts';
import { ContactList } from './ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm';
import { nanoid } from 'nanoid';

import { Layout } from './GlobalStyle/Layout/Layout.styled';
import { Section } from './Section';

export const App = () => {
  const localContacts = JSON.parse(localStorage.getItem('contacts'));
  const contactsDataObj = initialContacts.map(contact => {
    contact.id = nanoid();
    return contact;
  });

  const [contacts, setContacts] = useState(
    () => localContacts ?? contactsDataObj
  );
  const [filter, setFilter] = useState('');
  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = FormData => {
    const newContact = {
      id: nanoid(),
      name: FormData.name,
      number: FormData.number,
    };

    contacts.find(
      contact => contact.name.toLowerCase() === FormData.name.toLowerCase()
    )
      ? alert(`${FormData.name} is already in contacts`)
      : setContacts(prevState => [newContact, ...prevState]);
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <Layout>
      <Section title="Add contact">
        <ContactForm onSubmit={onSubmit} />
      </Section>
      {contacts.length > 0 && (
        <Section
          title="Contacts"
          headerContent={
            <Filter
              onFilter={onFilter}
              type="text"
              value={filter}
              name="filter"
              title=""
              pattern=""
            />
          }
        >
          <ContactList contacts={visibleContacts} onRemove={deleteContact} />
        </Section>
      )}
    </Layout>
  );
};
