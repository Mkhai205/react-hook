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
        console.log('My name is: ' + this.state.name);
        console.log('My age is: ' + this.state.age);

        // marge state => update state (react class)
        this.setState({
            name: 'Khai Nguyen',
            age: Math.floor(Math.random() * 100),
        });
        
    }

    handleOnMouseOver(event) {
        console.log('Mouse over !');
        console.log(event.pageX);
        
    }

    handleOnchangeInput(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();
        // alert('Form submitted !');
        console.log(this.state);
        
    }

    // JSX
    render() {
        return (
            <div>
                <h1>My first component</h1>
                <p><b>Name</b>: {this.state.name}</p>
                <p><b>Age</b>: {this.state.age}</p>
                <p><b>Nationality</b>: {this.state.nationality}</p>
                <form onSubmit={(event) => {this.handleOnSubmit(event)}}>
                    <input type="text" onChange={(event) => {this.handleOnchangeInput(event)}} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;