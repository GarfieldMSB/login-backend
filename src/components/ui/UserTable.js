import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { userSetActive, userStartDelete, userStartLoading } from '../../actions/users';

export const UserTable = () => {

    const dispatch = useDispatch();

    const onSelectUser = (e) => {
        dispatch(userSetActive(e))
    }

    const handleDelete = () => {
        Swal.fire({
            title: '¿Desea eliminar al usuario?',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            denyButtonText: `No eliminar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(userStartDelete())
                

            } else if (result.isDenied) {
                Swal.fire('No se han guardado los cambios', '', 'info')
            }
        })
        
    }

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 130 },
        { field: 'lastname1', headerName: 'Primer apellido', width: 130 },
        { field: 'lastname2', headerName: 'Segundo apellido', width: 130 },
        { field: 'email', headerName: 'Correo', width: 180, },
        {
            field: 'actions', headerName: 'Acciones', width: 350, justifyContent: 'center', renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </Button>
                );
            }
        },
    ];

    const { users } = useSelector(state => state.userReducer);

    return (
        <div style={{ height: 600, width: '100%', marginTop: '20px' }}>
            <DataGrid
                getRowId={(row) => row.uid}
                rows={users}
                disableColumnMenu={true}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                onRowClick={onSelectUser}
            />
        </div>
    )
}
