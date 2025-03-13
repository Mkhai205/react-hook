import React from 'react';

class DisplayInfor extends React.Component {
    render() {
        // props => properties
        // props => read-only
        console.log(this.props);
        
        // destructuring array/object
        const { name, age } = this.props;

        return (
            <div>
                <div>My name is: {name}</div>
                <div>My age is: {age}</div>
            </div>
        )
    }
}

export default DisplayInfor;