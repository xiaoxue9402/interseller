import React from "react";

import "./App.css";
import MainArea from "./components/MainArea";
import { Data } from "./components/interface";

interface State {
  contacts: any[];
}

export default class App extends React.Component {
   state: State = {
    contacts: [],
  }
  componentDidMount() {
    fetch(
      " https://interseller.pipedrive.com/api/v1/persons?api_token=2ce39665b10b200e6da1f49bfe6014429a98a3ea"
    )
      .then((res) => res.json())
      .then((res) => this.setState({contacts: [...res.data]}));
  }
  render() {
    const contactInfo: Data[] = this.state.contacts.map((contact) => {
      return {
        firstName: contact.first_name,
        lastName: contact.last_name,
        organization: contact.org_name,
        email: contact.email[0].value,
        phone: contact.phone[0].value,
      };
    })
    return (
      <>
        <MainArea contacts={this.state.contacts} />
      </>
    )
  }
}
