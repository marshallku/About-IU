import React from "react";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        fetch(`/data/${this.props.uri}.json`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    list: response,
                });
            });
    }

    render() {
        const { isLoading, list } = this.state;

        if (!isLoading) {
            return list.map((item, index) => {
                return (
                    <li key={index}>
                        <div>{item.name}</div>
                    </li>
                );
            });
        } else {
            return null;
        }
    }
}

export default List;
