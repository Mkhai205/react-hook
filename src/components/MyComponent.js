import React from 'react';

class MyComponent extends React.Component {
    // JSX
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                {Math.random()}
            </div>
        );
    }
}

export default MyComponent;