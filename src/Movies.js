import React, { Component } from 'react';

class Movies extends Component {
    render() {
        return (
            <div>
                {this.props.list}
            </div>
        );
    }
}

export default Movies;