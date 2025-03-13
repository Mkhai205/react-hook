import React from 'react';

class MyComponent extends React.Component {

    state = {
        name: 'Khai',
        age: 20,
        nationality: 'Vietnam'
    }

    // JSX
    render() {
        return (
            <div>
                <h1>My first component</h1>
                <p><b>Name</b>: {this.state.name}</p>
                <p><b>Age</b>: {this.state.age}</p>
                <p><b>Nationality</b>: {this.state.nationality}</p>
            </div>
        );
    }
}

export default MyComponent;