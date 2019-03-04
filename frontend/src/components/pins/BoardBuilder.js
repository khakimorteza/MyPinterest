import React from "react";

class BoardBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  componentDidMount() {
    this.props.authenticate();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { handleCreateAboard, currentUser } = this.props;

    return (
      <>
        <form>
          <input
            required
            name="title"
            type="text"
            placeholder="Add title"
            onChange={this.handleChange}
          />
          <br />
          <button
            value="submit"
            placeholder="save"
            onClick={e => {
              e.preventDefault();
              handleCreateAboard(this.state.title, currentUser.id);
            }}
          >
            Save
          </button>
        </form>
      </>
    );
  }
}

export default BoardBuilder;
