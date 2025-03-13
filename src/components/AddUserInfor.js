import React from 'react';

class AddUserInfor extends React.Component {
    state = {
        name: '',
        age: 0,
        gender: 'male',
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

    handleOnchangeName(event) {
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

    handleOnchangeGender(event) {
        this.setState({
            gender: event.target.value
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();
        // alert('Form submitted !');
        // console.log(this.state);
        this.props.handleAddNewUser({
            name: this.state.name,
            age: this.state.age,
            gender: this.state.gender,
        });
    }

    render() {
        return (
            <div className='add-user-infor-container'>
                <p><b>Name</b>: {this.state.name}</p>
                <p><b>Age</b>: {this.state.age}</p>
                <p><b>Gender</b>: {this.state.gender}</p>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <label>Your name: </label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(event) => { this.handleOnchangeName(event) }}
                    />
                    <br />

                    <label>Your age: </label>
                    <input
                        type="text"
                        value={this.state.age}
                        onChange={(event) => { this.handleOnchangeAge(event) }}
                    />
                    <br />

                    <label>Your gender: </label>
                    <input
                        type="text"
                        value={this.state.gender}
                        onChange={(event) => { this.handleOnchangeGender(event) }}
                    />
                    <br />

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUserInfor;