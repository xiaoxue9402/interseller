import React from "react";

import "./App.css";
import MainArea from "./components/MainArea";
import {Data} from "./components/interface"

  function App(): JSX.Element {
  const [contacts, setContacts] = React.useState<Array<Data>>([])
  async () => {
    const getContacts = async () => {
      return await fetch(
        " https://interseller.pipedrive.com/api/v1/persons?api_token=2ce39665b10b200e6da1f49bfe6014429a98a3ea"
      )
        .then((res) => res.json())
        .then((res) => res.data);
    };
    setContacts([await getContacts()])
  }
  
  return (
    <div className="App">
      <MainArea 
        contacts={contacts}
      />
    </div>
  )
}

export default App;
