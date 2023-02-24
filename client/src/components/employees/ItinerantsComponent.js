import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import EmployeeCustomToolbar from './EmployeeCustomToolbar';
import AddNewEmployeeModal from './modals/AddNewEmployeeModal';
import moment from 'moment';
const ItinerantsComponent = ({itinerants,setAccounts}) => {
  const [itinerantList, setItinerantList] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    setItinerantList(itinerants);
    var temp=[];
    itinerants && itinerants.map((item)=>{
      temp.push([item.fname && item.fname,item.lname && item.lname,item.email && item.email,item.contact_no && item.contact_no,`${item.purok?item.purok:""} ${item.street?item.street:""} ${item.barangay?item.barangay:""}`,item.birthday && moment().diff(item.birthday, 'years'),item.gender && item.gender,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.status && item.status===true?'Active':'Inactive',item.image]);
    })
    setData(temp);
  }, [itinerants])
  
  const columns = ["Last Name", "First Name", "Email", "Contact Number","Address","Age","Gender","Date Added","Status"];

    const options = {
      selectableRowsHeader: false,
      selectableRows:'single',
      filter: true,
      filterType: 'dropdown',
      customToolbarSelect:(selectedRows,displayData)=>(
        <EmployeeCustomToolbar setAccounts={setAccounts} data={data[selectedRows.data[0].dataIndex]} selectedRows={selectedRows} displayData={displayData}/>    
      )
    };
    return (
        <div>
            <MUIDataTable
              title={"Itinerants List"}
              data={data}
              columns={columns}
              options={options}
            />
        </div>
    )
}

export default ItinerantsComponent
