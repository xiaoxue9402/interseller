import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";

import { Data } from "./interface";

interface Props {
  contactInfo: Data[];
}
export const ContactsTable = (props: Props): JSX.Element => {
  const [columns, setColumns] = React.useState([
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Label", field: "label" },
    { title: "Organization", field: "organization" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ]);
  const [data, setData] = React.useState<Array<Data>>([...props.contactInfo]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleAddRow = (newData: Data) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setData([...data, newData]);
      }, 800);
    });

  const handleRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedData = [...data];
        const index = oldData.tableData.id;
        updatedData[index] = newData;
        setData([...updatedData]);
        resolve();
      }, 800);
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
