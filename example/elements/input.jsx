import React from 'react';
import ReactDOM from 'react-dom';

class InputField extends React.Component{

	render(){
		return 	<div>
					<label for={this.props.id}>
						{this.props.label} 
					</label>
					<input 	id={this.props.id} 
							defaultValue={this.props.defaultValue} 
							type={this.props.type} 
							ref={this.props.id}
							size="25">
					</input>
					<br/>
				</div>
	}
}

export default InputField;