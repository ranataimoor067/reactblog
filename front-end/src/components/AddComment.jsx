import React, {useState} from 'react'

const AddComment = ({articleName, setArticleInfo}) => {
	const [username, setUsername] = useState('')
	const [commentText, setCommentText] = useState('')
	
	const addComments = async () => {
		const result = await fetch(`http://localhost:8080/api/articles/${articleName}/add-comments`, {
			method: "POST",
			body: JSON.stringify({username, text: commentText}),
			headers: {
				"Content-Type": "application/json",
			},
		});
			const body = await result.json()
			setArticleInfo(body)
			setUsername("")
			setCommentText("")
	}
	return (
		<form className="shadow rounded px-8 pt-6 mb-4">
			<h3 className="text=xl font-bold mb-4 text-gray-900" style={{ color: 'var(--text-color)' }}>Add a comment</h3>
			<label className="block text-gray-70 text-sm font-bold mb-2">Name: </label>
			<input type="text" onChange={(e)=> setUsername(e.target.value)} value={username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
			<label className="block text-gray-70 text-sm font-bold mb-2">Text: </label>
			<textarea onChange={(e)=> setCommentText(e.target.value)} value={commentText} rows="4" cols="50" className="block text-gray-70 text-sm font-bold mb-2"/>
			<button onClick={() => addComments()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:pointer">Add Coments</button>
		</form>
	)
}

export default AddComment