import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import contactOperations from '../../redux/contact/contact-operations';
import ListItem from "../ListItem";

import styles from "./ContactList.module.scss";

class ContactList extends Component {

  componentDidMount() {
    this.props.fetchContacts();    
  }

  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul className={styles.phoneBookList}>
        {contacts.map(({ id, name, number }) => {
          return (
            <ListItem
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteItem={onDeleteContact}
            />
          );
        })}
      </ul>
    );
  }
};

ContactList.propTypes = {
  fetchContacts: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf.isRequired,
};

const getVisibleContact = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => {
  const visivbleContacts = getVisibleContact(items, filter);

  return {
    contacts: visivbleContacts,
  };
};

const mapDispatchToProps = (dispatch) => ({
    fetchContacts: () => dispatch(contactOperations.fetchContacts()),
    onDeleteContact: id => dispatch(contactOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);