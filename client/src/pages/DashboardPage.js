import React, { useState, useEffect } from 'react'
import PageLayout from "./PageLayout";


import { Paper,Grid,Button} from '@mui/material';
        
import DashboardCard from '../components/dashboard/DashboardCard'
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
 
  // useEffect(() => {
  //   if(Cookies.get('user_id')){
  //     Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/dashboard`,{accessToken: Cookies.get('user_id')})
  //     .then((res) => {
  //         if(res){
  //           setData(res.data);
  //         }
  //     }) 
  //   }else{
  //     navigate("/login");
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])
  // const {drivers,trucks,dumpsters,chartData,collections} = data;

  const dashcards = [
    {id:1, title: "Active Itinerants", count:5, icon:<PersonIcon style={{float:'right'}} fontSize="large"/>},
]
  
  return (
    <PageLayout headerTitle={"Dashboard"}>
       <div>
        <Grid container spacing={3}>
          {dashcards.map(dashcard => (
          <Grid item key={dashcard.id} xs={12} md={6} lg={3}>
            <DashboardCard id={dashcard.id} data={data} title={dashcard.title} count={dashcard.count} icon={dashcard.icon}/>
          </Grid>
          ))}      
            {/* Chart */}
            <Grid item xs={12} sx={{mt:4, mb:4}}>
                <Paper
                    sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 280,
                    maxWidth: 'lg'
                    }}
                >
              
                </Paper>
            </Grid>
        </Grid>
        </div>  
    </PageLayout>
  );
};

export default DashboardPage;
