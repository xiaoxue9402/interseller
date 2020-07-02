import React from "react";
import MaterialTable, { Column } from "material-table";

import { Data } from "./interface";


interface Props {
  contacts: [];
}
export const ContactsTable = (props): JSX.Element => {
  const [columns, setColumns] = React.useState([
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Label", field: "label" },
    { title: "Organization", field: "organization" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ]);
  const [data, setData] = React.useState<Array<Data>>(
    props.map((person: Data) => {
      return {
        firstName: person.firstName,
        lastName: person.lastName,
        label: person.label,
        organization: person.organization,
        email: person.email,
        phone: person.phone,
      };
    })
  );

  const handleAddRow = (newData: Data) =>
    new Promise((resolve, reject) => {
      () => {
        setData([...data, newData]);
        resolve();
      };
    });

  const handleRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      const updatedData = [...data];
      const index = oldData.tableData.id;
      updatedData[index] = newData;
      setData([...updatedData]);
      resolve();
    });

  return (
    <MaterialTable
      title="Person Recorder"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) => handleAddRow(newData),
        onRowUpdate: (newData, oldData) => handleRowUpdate(newData, oldData),
      }}
    />
  );
};


