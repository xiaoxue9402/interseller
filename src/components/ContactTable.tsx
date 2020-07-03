import React, { useEffect, useState } from "react";
import MaterialTable, { Column } from "material-table";

import { Data } from "./interface";

export const ContactsTable = (): JSX.Element => {
  const [columns, setColumns] = React.useState([
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ]);
  const [data, setData] = useState<Array<Data>>([]);

  const getContacts = () => {
    return data.length === 0
      ? fetch(
          "https://interseller.pipedrive.com/api/v1/persons?api_token=2ce39665b10b200e6da1f49bfe6014429a98a3ea"
        )
          .then((res) => res.json())
          .then((res) => refactorData(res))
          .then((data: Data[]) => setData([...data]))
      : null;
  };

  const refactorData = (data) => {
    console.log(data);
    const newData: Data[] = data.data.map((contact) => {
      return {
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email[0].value,
        phone: contact.phone[0].value,
        id: contact.id,
      };
    });
    return newData;
  };
  getContacts();

  const updateContact = async (contactData: Data) => {
    const req = fetch(
      `https://interseller.pipedrive.com/api/v1/persons/${contactData.id}?api_token=2ce39665b10b200e6da1f49bfe6014429a98a3ea`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: contactData.id,
          name: `${contactData.firstName} ${contactData.lastName}`,
          email: [contactData.email],
          phone: [contactData.phone],
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => (res.success ? true : false));
    const resp = await Promise.resolve(req);
    return resp;
  };

  const deleteContact = () => {};

  const addContact = () => {};

  console.log(data);
  const handleAddRow = (newData: Data) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setData([...data, newData]);
      }, 800);
    });

  return (
    <MaterialTable
      title="Person Recorder"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData!.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              updateContact(newData).then((res) =>
                res ? resolve() : reject()
              );
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
};
export default ContactsTable;
