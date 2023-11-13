import react from 'react'
import Header from '../components/Header';
import { vendiaClient } from "../vendiaClient";
import { Button } from '@mui/material';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import {DataGrid} from '@mui/x-data-grid';
const { client } = vendiaClient();
//unstable


//function ViewDetail() {

    const ViewDetail = () => {
        const [deviceList, setDeviceList] = useState()
      
        //shows us what devices are being tested in the vendia website 
        const listDevice = async () => {
          const listDeviceResponse = await client.entities.test.list()
          setDeviceList(listDeviceResponse?.items)
        }
      
        useEffect(() => {
            listDevice()
          }, [])
          
    const location = useLocation();
    const device = location.state;
    console.log('Device ID: ' + device._id + '\n' +
                'Device Name: ' + device.Device + '\n' +
                'Organization: ' + device.OrgAssignment + '\n' +
                'Updated By: '+ device.UpdatedBy + '\n' +
                'testID: '+ device.TestID + '\n' +
                'testName:'+ device.TestName + '\n'+
                'Notes:' + device.Notes + '\n' +
                'completed' + device.Completed + '\n' + 
                'testMethod' + device.TestMethod);

    /*const rows = [
        {id: device.TestID, col1: device.OrgAssignment, col2: device.TestName, col3: device.TestMethod,col4: device.Notes, col5: device.Completed, col6: device.UpdatedBy}
    ];    */


    const rows = [];

    //maps all entities in test on vendia then if the device name matches states device name pushes info into data grid
    deviceList?.map((item,index) => {
        
        if (item.Device == device.Device) {        
            rows.push({id: item.TestID, col1: item.OrgAssignment, col2: item.TestName, col3: item.TestMethod,col4: item.Notes, col5: item.Completed, col6: item.UpdatedBy})
                
        
            }
    })
        
    
    const columns = [
        {field: 'id', headerName: 'TestID', width: 150 },
        {field: 'col1', headerName: 'OrgAssignment', width: 150 },
        {field: 'col2', headerName: 'TestName', width: 150 },
        {field: 'col3', headerName: 'TestMethod', width: 150 },
        {field: 'col4', headerName: 'Notes', width: 150 },
        {field: 'col5', headerName: 'Completed', width: 150 },
        {field: 'col6', headerName: 'UpdatedBy', width: 150 }
    ];

    
       
    return(
        <>
        <Header />
        <h2>ViewDetail </h2>
        
        <div> Device ID: {device._id} </div>
        <div> Device Name: {device.Device} </div>
    

        <div>  
            <DataGrid rows={rows} columns={columns} />
        </div>

        
        </>
    ) 
    }
//}
export default ViewDetail;

