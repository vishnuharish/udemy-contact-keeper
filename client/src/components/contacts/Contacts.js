import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contacts/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layouts/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered, getContacts, loading } = contactContext;
	useEffect(() => {
		getContacts();
	}, []);

	console.log(contacts);
	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>{'Please add a contact'}</h4>;
	}
	return (
		<Fragment>
			{contacts && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map(contact => (
								<CSSTransition
									key={contact['_id']}
									timeout={500}
									classNames='item'>
									<ContactItem key={contact['_id']} contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map(contact => (
								<CSSTransition
									key={contact['_id']}
									timeout={500}
									classNames='item'>
									<ContactItem key={contact['_id']} contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
