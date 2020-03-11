import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import FilterContacts from '../contacts/FilterContacts';
const Home = () => {
	return (
		<div className='grid-2'>
			<div>
				<ContactForm />
			</div>
			<div>
				<FilterContacts />
				<Contacts />
			</div>
		</div>
	);
};

export default Home;
