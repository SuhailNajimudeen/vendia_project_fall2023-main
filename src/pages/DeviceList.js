import * as React from 'react'
import Header from "../components/Header"

import Paper from '@mui/material/Paper'

import { useEffect, useState} from "react"
import { vendiaClient } from "../vendiaClient"

import './DeviceList.css'
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';




const { client } = vendiaClient()

export const DeviceList = () => {
  const [deviceList, setDeviceList] = useState()

  //shows us what devices are being tested in the vendia website 
  const listDevice = async () => {
    const listDeviceResponse = await client.entities.test.list()
    setDeviceList(listDeviceResponse?.items)
  }

  useEffect(() => {
      listDevice()
    }, [])

  const handleDelete = async (deviceId) => {
      try {
          await client.entities.test.remove(deviceId)
          setDeviceList(prevDeviceList => prevDeviceList.filter(device => device._id !== deviceId))
      } catch (error) {
          console.error("Failed to delete device:", error)
      }
  }

  const navigate = useNavigate();
  const viewDetail = async (deviceId) => {
    const getDevice = await client.entities.test.get(deviceId);
    console.log('Device Selt: ' + getDevice.Device);
    navigate("/ViewDetail", {state:getDevice});
    
  }
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (

    <>
    <Header />
    <h2>
      Device List
    </h2>
    
  

   
       <TableContainer component={Paper}>
       <Table sx={{ minWidth: 200 }} aria-label="simple table">
         <TableHead>
           <TableRow>
       
            <TableCell align="left">Device</TableCell>
     
         
           </TableRow>
         </TableHead>
         <TableBody>
    
         {deviceList?.map((row) => (
          
             <TableRow
               key={row._id}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               
             >
              
     
              
               <TableCell component="th" scope="row">
                
 
               <TableCell align="left">{row.Device}</TableCell>
               
    

               <DeleteIcon direction="row"size="small" color="red" onClick={() => handleDelete(row._id)}spacing={2}>
      <IconButton aria-label="delete">
    
      </IconButton>
      </DeleteIcon>
      
      <VisibilityIcon aria-label="view" onClick={() => viewDetail(row._id)}></VisibilityIcon>
   



               </TableCell>
    

             </TableRow>
             
           ))}
      <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
         </TableBody>
   
       </Table>
       <TableContainer
  initialState={{
    filter: {
      filterModel: {
        items: [],
        quickFilterValues: ['quick', 'filter'],
      },
    },
  }}
/>
     </TableContainer>
    
    
    </>
    )
           }

    
          

    
          