import React from 'react';
import './InputBox.css'

const InputBox = ( {onInputChange, onButtonClick}) =>{
	return (
		<div>
		<p className='f3'>{'This face-identifier app will indentify the faces of a people in the image. Give it a try!'}</p>
		<div className = 'center  pa4 br3 shadow-5 form'>
		<div  className='center'>
		<input type="text" className="f4 pa2 center w-70" onChange = {onInputChange}/>
		<button className='w-30 grow f4 link ph3 pv2  dib white bg-green' onClick = {onButtonClick}>Detect</button>
		</div>
		</div>
		</div>
		)
}
export default InputBox;