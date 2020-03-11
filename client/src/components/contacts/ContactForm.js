import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contacts/ContactContext';
const ContactForm = () => {
	const [contact, setContact] = useState({
		name: '',
		email: '',
		type: 'personal',
		phone: ''
	});
	const contactContext = useContext(ContactContext);
	const { addContact, current, clearCurrent, updateContact } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				type: 'personal',
				phone: ''
			});
		}
	}, [contactContext, current]);

	const onChange = e => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		setContact({
			name: '',
			email: '',
			type: 'personal',
			phone: ''
		});
	};

	const clearAll = () => {
		// setContact
		clearCurrent();
	};

	const { name, type, email, phone } = contact;

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
			<input
				type='text'
				name='name'
				placeholder='Name'
				id='contact-keeper-name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='text'
				name='email'
				placeholder='Email'
				id='contact-keeper-email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				name='phone'
				placeholder='Phone'
				id='contact-keeper-phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact type</h5>
			<label>
				<input
					type='radio'
					name='type'
					value='personal'
					checked={type === 'personal'}
					onChange={onChange}
				/>
				{'Personal'}{' '}
			</label>
			<label>
				<input
					type='radio'
					name='type'
					value='professional'
					checked={type === 'professional'}
					onChange={onChange}
				/>
				{'Professional'}
			</label>
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
