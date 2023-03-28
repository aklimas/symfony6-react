import React, { useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import Swal from 'sweetalert2'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { data, states } from './makeData';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';

import axios from 'axios';

const Example = () => {

    // const  [data, setProjectList] = useState([])


    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setProjectList] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        fetchProjectList()
    }, [])

    const fetchProjectList = () => {
        axios.get('/api/project')
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleCreateNewRow = (values) => {
        tableData.push(values);

        // console.log(values);

        axios.post(`/api/project`, values)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Zapisano!',
                    showConfirmButton: false,
                    timer: 1500
                })
                fetchProjectList()
            })
            .catch(function (error) {

                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR!',
                    showConfirmButton: false,
                    timer: 1500
                })
            });

        setProjectList([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render

            axios.put(`/api/project/${row.original.id}`, values)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Zapisano!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchProjectList()
                })
                .catch(function (error) {

                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });

            setProjectList([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !confirm(`Czy jesteś pewien że chesz usunąć ${row.getValue('name')}`)
            ) {
                return;
            }


            axios.delete(`/api/project/${row.original.id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usunięto!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchProjectList()
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });

            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setProjectList([...tableData]);
        },
        [tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'age'
                                ? validateAge(+event.target.value)
                                : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Nazwa',
            },
            {
                accessorKey: 'description',
                header: 'Opis',
            }
/*            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,
            },
            {
                accessorKey: 'firstName',
                header: 'First Name',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'email',
                header: 'Email',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'email',
                }),
            },
            {
                accessorKey: 'age',
                header: 'Age',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },*/
            /*{
                accessorKey: 'state',
                header: 'State',
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: states.map((state) => (
                        <MenuItem key={state} value={state}>
                            {state}
                        </MenuItem>
                    )),
                },
            },*/
        ],
        [getCommonEditTextFieldProps],
    );

    return (
        <>
            <MaterialReactTable
                enableRowSelection
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 30,
                    },
                }}
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing

                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                localization={MRT_Localization_PL}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edytuj">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Usuń">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={({ table }) => {
                    const handleDeactivate = () => {
                        table.getSelectedRowModel().flatRows.map((row) => {
                            //alert('deactivating ' + row.getValue('name'));

                            axios.delete(`/api/project/${row.original.id}`)
                                .then(function (response) {
                                    /*Swal.fire({
                                        icon: 'success',
                                        title: 'Usunięto!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })*/
                                    fetchProjectList()
                                })
                                .catch(function (error) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'ERROR!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                });

                            //send api delete request here, then refetch or update local table data for re-render
                            tableData.splice(row.index, 1);
                            setProjectList([...tableData]);

                        });
                    };
/*
                    const handleActivate = () => {
                        table.getSelectedRowModel().flatRows.map((row) => {
                            alert('activating ' + row.getValue('name'));
                        });
                    };

                    const handleContact = () => {
                        table.getSelectedRowModel().flatRows.map((row) => {
                            alert('contact ' + row.getValue('name'));
                        });
                    };*/

                    return (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                color="secondary"
                                onClick={() => setCreateModalOpen(true)}
                                variant="contained"
                            >
                                Dodaj wpis
                            </Button>
                            <Button
                                color="error"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={handleDeactivate}
                                variant="contained"
                            >
                                Usuń
                            </Button>
{/*                            <Button
                                color="success"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={handleActivate}
                                variant="contained"
                            >
                                Activate
                            </Button>
                            <Button
                                color="info"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={handleContact}
                                variant="contained"
                            >
                                Contact
                            </Button>*/}
                        </div>
                    );
                }}
            />
            <CreateNewAccountModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
            />
        </>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Dodaj nowy wpis</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Anuluj</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Dodaj wpis
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateAge = (age) => age >= 18 && age <= 50;

export default Example;
