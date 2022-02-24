import { useState } from 'react';


export const LoginForm = ({ setUserId }) => {

	const [formData, setFormData] = useState({
		userId: "",
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		setUserId(formData.userId);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="userId">User ID</label>
				<input onChange={(e) => setFormData({ ...formData, userId: e.target.value })} value={formData.userId} type="text" name="userId" id="userId" />
				<input type="submit" value="Log In" />
			</form>
		</div>
	)
}

// import { gql, useQuery } from '@apollo/client';
// import { useState } from 'react';

// const useImperativeQuery = (query) => {
// 	const { refetch } = useQuery(query, { skip: true });

// 	const imperativelyCallQuery = (variables) => {
// 		return refetch(variables);
// 	}

// 	return imperativelyCallQuery;
// }

// const GET_USER_ID = gql`
// 	query GetUserId($username: String!) {
// 		userId(username: $username) 
// 	}
// `;

// export const LoginForm = ({ setUserId }) => {

// 	const [formData, setFormData] = useState({
// 		username: "",
// 	})
// 	// const [getUserId, { called, loading, data }] = useLazyQuery(GET_USER_ID);
// 	// const { refetch } = useQuery(GET_USER_ID, { skip: true })
// 	const callQuery = useImperativeQuery(GET_USER_ID)

// 	// const handleSubmit = (e) => {
// 	// 	e.preventDefault()
// 	// 	console.log(formData);
// 	// 	getUserId({ variables: { username: formData.username } });
// 	// }
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		console.log(`getting user_id for user '${formData.username}'`);
// 		// const res = await refetch({ username: formData.username })
// 		const resp = await callQuery({ username: formData.username })
// 		console.log(resp)
// 		// if (error) {
// 		// 	console.error(error);
// 		// }
// 	}

// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit}>
// 				<label htmlFor="username">username</label>
// 				<input onChange={(e) => setFormData({ ...formData, username: e.target.value })} value={formData.username} type="text" name="username" id="username" />
// 				<input type="submit" value="Log In" />
// 			</form>
// 		</div>
// 	)
// }