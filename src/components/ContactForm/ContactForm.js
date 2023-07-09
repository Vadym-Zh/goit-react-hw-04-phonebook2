// import React, { useState } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  LabelContainer,
  Label,
  InputContainer,
  Input,
  Button,
} from './ContactForm.styled';

// export class ContactForm extends Component {
export const ContactForm = ({ onSubmit }) => {
  // state = {
  //   name: '',
  //   number: '',
  // };

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    // this.setState({ [name]: value });
    // console.log(name, value);
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    // this.reset();
    const contact = { name: name, number: number };
    onSubmit(contact);

    setName('');
    setNumber('');
  }

  // reset() {
  //   this.setState({ name: '', number: '' });
  // }

  // render() {
  //   const { name, number } = this.state;

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <LabelContainer>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder=" "
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          ></Input>
          <Label htmlFor="name">Name</Label>
        </LabelContainer>

        <LabelContainer>
          <Input
            type="tel"
            id="number"
            name="number"
            value={number}
            placeholder=" "
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          ></Input>
          <Label>Number</Label>
        </LabelContainer>
      </InputContainer>
      <Button type="submit">Add contact</Button>
    </Form>
  );
  // }
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
