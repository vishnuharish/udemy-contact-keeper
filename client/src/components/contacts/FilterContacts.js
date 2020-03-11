import React, { useContext, useEffect, useRef } from 'react';
import ContactContext from '../../context/contacts/ContactContext';

const FilterContacts = () => {
	const contactContext = useContext(ContactContext);
	const text = useRef('');
	const { filterContact, clearFilter, filtered } = contactContext;
	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});
	const onChange = e => {
		if (text.current.value !== '') {
			filterContact(e.target.value);
		} else {
			clearFilter();
		}
	};
	return (
		<form>
			<input ref={text} type='text' name='' id='' onChange={onChange} />
		</form>
	);
};

export default FilterContacts;
