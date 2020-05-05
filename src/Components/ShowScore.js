import React from 'react'

const ShowScore=({match})=>{
	return(
		<div>
			<h1>Score</h1>
			<h2>{match.params.score}/8</h2>
		</div>
	)
}

export default ShowScore