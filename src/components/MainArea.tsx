import React, { useState, useEffect } from "react";

import {ContactsTable} from './ContactTable';
import {Data} from "./interface"

interface Props {
  contacts: Data[];
} 
export default class MainArea extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() :JSX.Element {
    return (
      <div>
        <ContactsTable
          contacts={this.props.contacts}
        >
  
        </ContactsTable>
      </div>
    )
  }
  
}
