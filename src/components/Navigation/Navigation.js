import React from 'react';

const Navigation = ({onRouteChange , isSignedIn})=>{
		if(isSignedIn){
			return(
				<nav style = {{display:  'flex' ,  justifyContent : 'flex-end'}} >
					<p onClick = {()=>onRouteChange('signout')}className = 'f3 link p3 black pointer dim underline mr3'>Sign Out</p>
				</nav>
				)
			
	}else{
		return(
				<nav style = {{display:  'flex' ,  justifyContent : 'flex-end'}} >
					<p onClick = {()=>onRouteChange('home')}className = 'f3 link p3 black pointer dim underline mr3'>Sign In</p>
					<p onClick = {()=>onRouteChange('register')}className = 'f3 link p3 black pointer dim underline mr3'>Register</p>
				</nav>	
			)
	
	}
}
export default Navigation