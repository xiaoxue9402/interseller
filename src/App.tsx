import React from "react";

import "./App.css";
import ContactsTable from "./components/ContactTable";
import { Data } from "./components/interface";

interface State {
  contacts: Data [] | [];
}
export default class App extends React.Component<{}, State> {
  state = {
    contacts: []
  }
  componentDidMount() {
    fetch(
      "https://interseller.pipedrive.com/api/v1/persons?api_token=2ce39665b10b200e6da1f49bfe6014429a98a3ea"
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const newData: Data[] = res.data.map((contact: any) => {
            return {
              firstName: contact.first_name,
              lastName: contact.last_name || '',
              email: contact.email[0].value || '',
              phone: contact.phone[0].value || '',
              id: contact.id,
            };
          });
          return newData;
        } else {
          return [];
        }
      })
      .then((data: Data[]) => this.setState({contacts: [...data]}));
  }
  render() {
    return(
      <div>
        <ContactsTable contacts={this.state.contacts}/>
      </div>
    )
  }
}
