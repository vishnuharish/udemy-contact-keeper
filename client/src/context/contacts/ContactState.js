import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	UPDATE_CONTACT,
	CLEAR_FILTER,
	SET_CURRENT,
	CLEAR_CURRENT,
	FILTER_CONTACTS,
	CONTACT_ERROR,
	CLEAR_CONTACTS,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
		loading: true,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	//Get Contacts

	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: GET_CONTACTS, payload: res.data.contacts });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};
	//Add Contact

	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//Delete Contact

	const deleteContact = async (id) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	//Filter Contact
	const filterContact = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};
	//Update Contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//Clear Contacts

	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};
	//Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};
	//Clear Current
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				loading: state.loading,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContact,
				clearFilter,
				getContacts,
				clearContacts,
			}}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
