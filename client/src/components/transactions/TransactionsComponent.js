import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTransactionPageContext } from '../../pages/TransactionsPage';
import moment from 'moment';
import ViewTransactionModal from '../transactions/modals/ViewTransactionModal';
import { ButtonGroup } from '@mui/material';

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
const TransactionsComponent = () => {
  const [data, setData] = useState([]);
  const { queryResult } = useTransactionPageContext();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const transactions = queryResult.data.data;
  console.log(transactions)
  useEffect(() => {
    var temp = [];
    transactions && transactions.map((item) => {
      temp.push([item.transaction_number && item.transaction_number,
      item.customer_id.firstname +''+ item.customer_id.lastname &&  item.customer_id.firstname +' '+ item.customer_id.lastname,
      item.itinerant_id.firstname +''+ item.itinerant_id.lastname &&  item.itinerant_id.firstname +' '+ item.itinerant_id.lastname,
      item.amount && " \u20B1" + item.amount,
      item.payment_method && item.payment_method,
      item.product_name && item.product_name,
      item.quantity && item.quantity,
      item.pickup_address && item.pickup_address,
      item.dropoff_address && item.dropoff_address,
      item.status && item.status,
      item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY, h:mm A")
      ]);
    })
    setData(temp);
  }, [transactions])
 

  const handleOpenViewModal = (rowData) => {
    setOpenViewModal(true);
    setRowData(rowData);
  }

  const columns = [
    {
      name: "ID",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
        name:"Customer",
        label:"Customer",
        options: {
          filter: false,
          sort: false,
          display: false,
          viewColumns: false,
        }
    },
    {
        name:"Itinerant",
        label:"Itinerant",
        options: {
          filter: false,
          sort: false,
          display: false,
          viewColumns: false,
        }
    },
    {
      name: "Amount",
      label: "Amount",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Payment Method",
      label: "Payment Method",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Product Name",
      label: "Product Name",
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      }
    },
    {
      name: "Quantity",
      label: "Quantity",
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      }
    },
    {
      name: "Pickup Address",
      label: "Pickup Address",
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      }
    },
    {
      name: "Dropoff Address",
      label: "Dropoff Address",
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      }
    },
    {
      name: "Status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
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
      name: "Actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonGroup>
              <button onClick={() => handleOpenViewModal(tableMeta.rowData)} className="btn btn-primary mx-1"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
            </ButtonGroup>
          )
        }
      }
    }
  ]
  const options = {
    selectableRowsHeader: false,
    selectableRows: 'none',
    filter: true,
    filterType: 'dropdown'
  };
  return (
    <div>
      <ViewTransactionModal data={rowData} title=" View Transaction Details" openModal={openViewModal} setOpenModal={setOpenViewModal} handleCloseModal={() => setOpenViewModal(false)} />
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Transactions List"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>


  )
}

export default TransactionsComponent