import React from 'react';

class UserInfor extends React.Component {
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

    handleOnchangeAge(event) {
        // bad code
        // this.state.age = event.target.value;
        this.setState({
            age: event.target.value
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();
        // alert('Form submitted !');
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <p><b>Name</b>: {this.state.name}</p>
                <p><b>Age</b>: {this.state.age}</p>
                <p><b>Nationality</b>: {this.state.nationality}</p>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <label>Your name: </label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(event) => { this.handleOnchangeInput(event) }}
                    />
                    <br />
                    <label>Your age: </label>
                    <input
                        type="text"
                        value={this.state.age}
                        onChange={(event) => { this.handleOnchangeAge(event) }}
                    />
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfor;