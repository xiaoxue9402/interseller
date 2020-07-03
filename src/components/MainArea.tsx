import React from "react";

import { ContactsTable } from "./ContactTable";
import { Data } from "./interface";

interface Props {
  contacts: any[];
}

interface State {
  contactInfo: any[];
}

export default class MainArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contactInfo: [],
    };
  }
  componentDidMount() {
    const people = this.props.contacts.map((contact) => {
      return {
        firstName: contact.first_name,
        lastName: contact.last_name,
        organization: contact.org_name,
        email: contact.email[0].value,
        phone: contact.phone[0].value,
      };
    })
    return this.setState({contactInfo: [...people]});
  }
  render(): JSX.Element {
    console.log(this.state)
    return (
      <div>
        <ContactsTable contactInfo={this.state.contactInfo} />
      </div>
    );
  }
}
