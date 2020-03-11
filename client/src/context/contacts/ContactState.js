import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	UPDATE_CONTACT,
	CLEAR_FILTER,
	SET_CURRENT,
	CLEAR_CURRENT,
	FILTER_CONTACTS
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Aleta Vass',
				email: 'avass0@howstuffworks.com',
				phone: '755-295-7672',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Karalynn Hallewell',
				email: 'khallewell1@microsoft.com',
				phone: '526-294-8924',
				type: 'personal'
			},
			{
				id: 3,
				name: 'Erl Rickardes',
				email: 'erickardes2@marketwatch.com',
				phone: '569-718-8571',
				type: 'personal'
			},
			{
				id: 4,
				name: 'Bobbie Gilders',
				email: 'bgilders3@fema.gov',
				phone: '430-562-5127',
				type: 'personal'
			},
			{
				id: 5,
				name: 'Daryl Golsby',
				email: 'dgolsby4@fema.gov',
				phone: '625-903-0291',
				type: 'professional'
			},
			{
				id: 6,
				name: 'Halli Cordier',
				email: 'hcordier5@uol.com.br',
				phone: '659-782-9119',
				type: 'professional'
			},
			{
				id: 7,
				name: 'Cammy Farthin',
				email: 'cfarthin6@sun.com',
				phone: '719-342-7516',
				type: 'personal'
			},
			{
				id: 8,
				name: 'Bryn Kubanek',
				email: 'bkubanek7@is.gd',
				phone: '361-476-3241',
				type: 'personal'
			},
			{
				id: 9,
				name: 'Wylma Gardner',
				email: 'wgardner8@shareasale.com',
				phone: '498-626-1063',
				type: 'professional'
			},
			{
				id: 10,
				name: 'Clerissa Enderwick',
				email: 'cenderwick9@businessinsider.com',
				phone: '955-163-1153',
				type: 'personal'
			}
		]
	};

	const [state, disptach] = useReducer(ContactReducer, initialState);

	//Add Contact

	//Delete Contact

	//Set Current Contact

	//Filter Contact

	//Update Contact

	//Clear Filter

	//Clear Current

	return (
		<ContactContext.Provider value={{ contacts: state.contacts }}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
