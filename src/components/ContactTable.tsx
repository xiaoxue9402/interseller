import React from "react";
import MaterialTable, { Column } from "material-table";

interface Row {
  firstName: string;
  lastName: string;
  label: string;
  organization: string;
  email: string;
  phone: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const contactsTable = () => {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Label", field: "label" },
      { title: "Organization", field: "organization" },
      { title: "Email", field: "email" },
      { title: "Phone", field: "phone" },
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });
};

export default contactsTable;
