import React, { useEffect, useState } from "react";
import MaterialTable, { Column } from "material-table";

import { Data } from "./interface";

export const ContactsTable = (props): JSX.Element => {
  const [columns, setColumns] = React.useState([
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ]);
  const [data, setData] = useState<Array<Data>>(props.contacts);
  useEffect(() => {
    setData(props.contacts)
  }, [props])


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

  const deleteContact = async (contactData: Data) => {
    const req = fetch(
      `https://interseller.pipedrive.com/api/v1/persons/${contactData.id}?api_token=2ce39665b10b200e6da1f49bfe6014429a98a3ea`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((res) => (res.success ? true : false));
    const resp = await Promise.resolve(req);
    return resp;
  };

  const addContact = async (contactData: Data) => {
    const firstName = contactData.firstName;
    const lastName = contactData.lastName || "";
    const req = fetch(
      `https://interseller.pipedrive.com/api/v1/persons?api_token=2ce39665b10b200e6da1f49bfe6014429a98a3ea`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: contactData.id,
          name: `${firstName} ${lastName}`,
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

  return (
    <MaterialTable
      title="Person Recorder"
      columns={columns}
      data={data || []}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addContact(newData).then((res) => (res ? resolve() : reject()));
              if (data) {
                setData([...data, newData]);
              }
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (data) {
                const dataUpdate = [...data];
                const index = oldData!.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
              }

              updateContact(newData).then((res) =>
                res ? resolve() : reject()
              );
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (data) {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete] || []);
              }
              deleteContact(oldData).then((res) =>
                res ? resolve() : reject()
              );

              resolve();
            }, 1000);
          }),
      }}
    />
  );
};
export default ContactsTable;
