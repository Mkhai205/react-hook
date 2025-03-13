import React from 'react';

class MyComponent extends React.Component {

    state = {
        name: 'Khai',
        age: 20,
        nationality: 'Vietnam'
    }

    handleClick(event) {
        // console.log('Button clicked !');
        console.log(event);
    }

    handleOnMouseOver(event) {
        console.log('Mouse over !');
        console.log(event.pageX);
        
    }

    // JSX
    render() {
        return (
            <div>
                <h1>My first component</h1>
                <p><b>Name</b>: {this.state.name}</p>
                <p><b>Age</b>: {this.state.age}</p>
                <p><b>Nationality</b>: {this.state.nationality}</p>
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
            </div>
        );
    }
}

export default MyComponent;