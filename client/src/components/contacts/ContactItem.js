import React from 'react';

const ContactItem = ({ contact }) => {
	const { id, name, email, type, phone } = contact;
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
				<button className='btn btn-dark btn-sm'>Edit</button>
				<button className='btn btn-danger btn-sm'>Delete</button>
			</p>
		</div>
	);
};

export default ContactItem;
