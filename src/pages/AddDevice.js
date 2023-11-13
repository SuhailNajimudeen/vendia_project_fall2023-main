import React from "react";
import { useEffect, useState} from "react";
import { vendiaClient } from "../vendiaClient";
import Header from "../components/Header";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const { client } = vendiaClient();


export const AddDevice = () => {

    //all use state variables for various device and testing fields 
    const [device, setDevice] = useState('');
    const [testID, setTestID] = useState(0);
    const [orgAssign, setOrgAssign] = useState('');
    const [testName, setName] = useState('');
    const [testMethod, setTestMethod] = useState('');
    const [notes, setNotes] = useState('');
    const [complete, setComplete] = useState(false);
    const [updatedBy, setUpdatedBy] = useState('');


    // main variable to add device and test name along with test id
    const AddDevice = async () => {

        const addDeviceResponse = await client.entities.test.add({
            
            
            //state variables
            Device: device,
            TestID: testID,
            OrgAssignment: orgAssign,
            TestName: testName,
            TestMethod: testMethod,
            Notes: notes,
            Completed: complete,
            UpdatedBy: updatedBy
            
        })
        
    }

    //functions below handle info being inputted in form boxes
    const HandleDeviceChange = (event) => {
        setDevice(event.target.value);
    }

    //using parse int due to testID needing to be int
    const HandleTestIDChange = (event) => {
        setTestID(parseInt(event.target.value));
    }

    const HandleOrgAssignChange = (event) => {
        setOrgAssign(event.target.value);
    }

    const HandleTestNameChange = (event) => {
        setName(event.target.value);
    }

    const HandleTestMethodChange = (event) => {
        setTestMethod(event.target.value);
    }

    const HandleNotesChange = (event) => {
        setNotes(event.target.value);
    }

    const HandleCompleteChange = (event) => {
        setComplete(event.target.checked);
    }

    const HandleUpdatedBy = (event) => {
        setUpdatedBy(event.target.value);
    }
    

    //specific handle for when submit is used to add device and prevent data wipe
    const HandleSubmit = (event) => {
        event.preventDefault();
        
        AddDevice();
        
        const navigate = useNavigate();
        navigate("/DeviceList");
    }
    //end of handle functions

    // function for submit feedback 
    /*let form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Device Submitted!");

    });
    */
    return(
        <>
        <div>
        <Header />
            <h2>
             Add Device and info below <br />
              <br />
            </h2>
             <div>
                <form onSubmit = {HandleSubmit}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm:2, md:3 }}>
                    <Grid item xs={12} md={2} >
                       <TextField
                        sx={{ input: { color: 'white'},}}
                        label="Device Name"
                        type = "text"
                        name = "device"
                        placeholder="Enter Device name here"
                        value = {device}
                        onChange={HandleDeviceChange} 
                    />
                    </Grid>
                    <br />
                    <Grid item xs={12} md={2} >
                       <TextField
                        sx={{ input: { color: 'white'},}}
                        label="Test ID"
                        type = "number"
                        name = "testID"
                        placeholder="Enter TestID here"
                        value = {testID}
                        onChange={HandleTestIDChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={2}>
                       <TextField
                        sx={{ input: { color: 'white'},}}
                        label="Org Assignment"
                        type = "text"
                        name = "orgAssign"
                        placeholder="Enter Org Assignment here"
                        value = {orgAssign}
                        onChange={HandleOrgAssignChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={2}>
                       <TextField
                        sx={{ input: { color: 'white'},}}
                        label="Test Name"
                        type = "text"
                        name = "testName"
                        placeholder="Enter test name here"
                        value = {testName}
                        onChange={HandleTestNameChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={2}>
                       <TextField
                        sx={{ input: { color: 'white'},}}
                        label = "Test Method"
                        type = "text"
                        name = "testMethod"
                        placeholder="Enter Test Method here"
                        value = {testMethod}
                        onChange={HandleTestMethodChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={2}>
                       <TextField
                        sx={{ input: { color: 'white'},}}
                        label="Notes"
                        type = "text"
                        name = "notes"
                        placeholder="Enter Notes here"
                        value = {notes}
                        onChange={HandleNotesChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={12}>Completed?
                       <input
                        type = "checkbox"
                        checked = {complete}
                        name = "complete"
                        onChange={HandleCompleteChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    
                       <TextField
                        sx={{ input: { color: 'white'},}}
                        label="Updated by"
                        type = "text"
                        name = "updatedBy"
                        placeholder="Who updated device"
                        value = {updatedBy}
                        onChange={HandleUpdatedBy}
                    />
                    </Grid>
                    <Grid item xs={12}>  
                        <Button 
                        type="submit"
                        variant = "contained"
                        >
                        Submit
                        </Button>
                    </Grid>
                </Grid>
                </form>

            </div>

        </div>  
        </>

    );



}
