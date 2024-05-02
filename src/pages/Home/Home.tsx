import { People } from "@/data";
import { Person } from "@/models";
import { addFavorite, addPeople } from "@/redux/states";
import store from "@/redux/store";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export type HomeProps = {
  // types...
};

const Home: React.FC<HomeProps> = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const pageSizes = [5];
  const dispatch = useDispatch();

  const findPerson = (person: Person) =>
    !!selectedPeople.find((p) => p.id === person.id);

  const filterPerson = (person: Person) =>
    selectedPeople.filter((p) => p.id === person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person)
      ? filterPerson(person)
      : [...selectedPeople, person];
    dispatch(addFavorite(filteredPeople));
    setSelectedPeople(
      findPerson(person) ? filterPerson(person) : [...selectedPeople, person]
    );
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      flex: 1,
      Width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Checkbox
              size="small"
              checked={findPerson(params.row)}
              onChange={() => handleChange(params.row)}
            />
          }
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  useEffect(() => {
    dispatch(addPeople(People));
  }, []);

  return (
    <DataGrid
      rows={store.getState().people}
      columns={columns}
      disableColumnSelector
      disableRowSelectionOnClick
      autoHeight
      getRowId={(row) => row.id}
      pageSizeOptions={pageSizes}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
    />
  );
};

export default Home;
