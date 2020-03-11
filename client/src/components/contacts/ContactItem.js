import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contacts/ContactContext';
const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;
	const { id, name, email, type, phone } = contact;
	const onDelete = () => {
		deleteContact(id);
		clearCurrent();
	};
	const onEdit = () => {
		setCurrent(contact);
	};
	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}{' '}
				<span
					className={
						'badge ' +
						(type === 'professional' ? 'badge-success' : 'badge-primary')
					}
					style={{ textTransform: 'capitalize', float: 'right' }}>
					{type}
				</span>
			</h3>
			<ul>
				{email && (
					<li>
						<i className='fa fa-envelope-o' /> {email}
					</li>
				)}
				{phone && (
					<li>
						<i className='fa fa-phone' /> {phone}
					</li>
				)}
			</ul>
			<p>
				<button className='btn btn-dark btn-sm' onClick={onEdit}>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
};

export default ContactItem;
