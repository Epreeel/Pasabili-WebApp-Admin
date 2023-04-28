import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import { useUserVerificationPageContext } from '../../pages/UserVerificationPage';
import { ButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ViewUserVerificationModal from './modals/ViewUserVerificationModal';
import VerifyCustomerModal from './modals/VerifyCustomerModal';
import Firebase from '../helpers/Firebase';

const theme = createTheme({
    components: {
        MUIDataTableBodyRow: {
            styleOverrides: {
                root: {
                    "&.MuiTableRow-hover": {
                        "&:hover": {
                            cursor: 'pointer'
                        }
                    }
                }
            }
        },
    }
})

const UserVerificationComponent = () => {
    const { queryResult } = useUserVerificationPageContext();

    const verifications = queryResult.data.data.verifications;
    const [data, setData] = useState([]);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        var temp = [];
        verifications && verifications.map((item) => {
            const timestamp = Firebase.firestore.Timestamp.fromMillis(
                item.createdAt._seconds * 1000 +   item.createdAt._nanoseconds / 1000000
            );
            const createdAt = timestamp.toDate();
            temp.push([ 
            item.customerDetails.firstname + ' ' + item.customerDetails.lastname && item.customerDetails.firstname + ' ' + item.customerDetails.lastname,
            item.introduction,
            item.custId && item.custId != null ? 'Customer' : 'Itinerant',
            item.createdAt && moment(createdAt).format("MMMM DD, YYYY"),
            item.image,
            item.custId ? item.custId : item.itinId
            ]);
        })
        setData(temp);
    }, [verifications])

    const handleOpenViewModal = (rowData) => {
        setOpenViewModal(true);
        setRowData(rowData);
    }
    const handleDeleteModal = (e, rowData) => {
        e.stopPropagation();
        setDeleteModal(true)
        setRowData(rowData);
    }

    const columns = [
        {
            name: "Name",
            label: "Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Introduction",
            label: "Introduction",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "Type",
            label: "Type",
            options: {
                filter: true,
                sort: true
            }
        },


        {
            name: "Date Added",
            label: "Date Added",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Image",
            label: "Image",
            options: {
                filter: false,
                sort: false,
                display: false,
                viewColumns: false,
            }
        },
        {
            name: "Actions",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <ButtonGroup>
                            <button onClick={() => handleOpenViewModal(tableMeta.rowData)} className="btn btn-primary mx-1"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                            <button onClick={(e) => handleDeleteModal(e, tableMeta.rowData)} className= "btn btn-success"><i className= "fa fa-check" aria-hidden="true"></i></button>
                        </ButtonGroup>
                    )
                }
            }
        }
    ];


    const options = {
        selectableRowsHeader: false,
        selectableRows: 'none',
        filter: true,
        filterType: 'dropdown'
    };



    return (
        <div>
            <ViewUserVerificationModal data={rowData} title=" View Customer Document" openModal={openViewModal} setOpenModal={setOpenViewModal} handleCloseModal={() => setOpenViewModal(false)} />
            <VerifyCustomerModal data={rowData} title="Verify Customer" module={"customers"} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} />
            <ThemeProvider theme={theme}>
                <MUIDataTable
                    title={"Verification List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    )
}




export default UserVerificationComponent