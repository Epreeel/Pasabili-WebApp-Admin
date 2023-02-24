/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import ViewEmployeeModal from "./modals/ViewEmployeeModal";
import ReactivateModal from "./modals/ReactivateModal";
import DeleteEmployeeModal from "./modals/DeleteEmployeeModal";
import { useState } from "react";
import { useEffect } from "react";
const EmployeeCustomToolbar = ({data,selectedRows,displayData,setAccounts}) => {
    const [openDeleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
      return () => {
        setDeleteModal(false);
      }
    }, [])
    
    return (
        <div>
            {displayData[selectedRows.data[0].dataIndex].data[8] === "Active"?(
                <DeleteEmployeeModal setAccounts={setAccounts} data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal}/>
            ):(
                <ReactivateModal setAccounts={setAccounts} data={displayData[selectedRows.data[0].dataIndex].data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal}/>
            )}
        </div>
    )
}

export default EmployeeCustomToolbar
