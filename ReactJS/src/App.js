import { Component } from "react";
import { name } from "../package.json";
import { List, Modal, Button, Error, Form } from "./components";

// Assign the backend base url here
export const NODE_APP_URL = "http://localhost:8001/fixtures";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: undefined,
      showModal: false,
      formValues: {},
      formError: undefined
    }
  }

  componentDidMount = () => {
    this.fetchData();
  };

  // Function to Show the Modal component
  showModalHandler = () => {
     // Your code goes here
     this.setState({showModal:true})
  }

  // Function to Hide the Modal component
  closeModalHandler = () => {
     // Your code goes here
     this.setState({showModal:false,error:undefined,formValues: {},formError: undefined})
  }

  // Handles all input entered in the form component
  // and stores the values in the state variable "formValues" of Object type
  // formValues is a key-value pair of input elements { name: "value", name1: "value1" }
  inputChangeHandler = (e) => {
    const { name, value, type } = e.target;
    let { formValues } = this.state;
    formValues = { ...formValues, [name]: type === "number" ? parseInt(value) : value };
    this.setState({ formValues });
  }

  // Fetch data from the api
  // use NODE_APP_URL variable for the url in fetch method
  // NODE_APP_URL variable is assigned in the top of this file (src/App.js).
  fetchData = async () => {
    // Your code goes here
    // Fill up the code required for posting data to backend
    var res = await fetch(NODE_APP_URL)
    var dt= await res.json()
    this.setState({data:dt.records})
  };

  // SubmitHandler should be used to create a record i.e., to execute post request to backend
  // On success of post request close modal and fetch call fetchData method again.
  // On Error set the error message in the banner.
  submitHandler = (e) => {
    e.preventDefault();
    const { formValues } = this.state;

    fetch(NODE_APP_URL, {
      method: "post",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) this.setState({ formError: res.error });
        else {
          this.fetchData();
          this.closeModalHandler();
        }
      });
  }

  render() {
    const { showModal, error, data, formError } = this.state;

    return (
      <div className="app">
        <div className="app-body">
          <h2 className="app-title">{name.replace(/_/g, ' ')}</h2>
          <Error message={error} />
          <List data={data} />

          <div className="footer-controls">
            {/* Your code goes here */}
            {/* Render a Button that will display the Modal */}
            <Button onClick={this.showModalHandler} className="success">Add</Button>
          </div>
        </div>

        <Modal show={showModal} closeHandler={this.closeModalHandler}>
          {/* Your code goes here */}
          {/* Render the Form component here */}
          <Form title="Add" error={formError} inputOnChangeHandler={this.inputChangeHandler} onSaveHandler={this.submitHandler}/>
        </Modal>
      </div>
    );
  }
}

export default App;
