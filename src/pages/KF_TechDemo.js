//==================================== READ ME =====================================
// To view this tech demo:
//     - Go to app.js
//     - Change line 16 to <Route index element={<TechDemo />} />

import react from 'react'
import { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import Header from '../components/Header';

const { client } = vendiaClient();

// Used to pull devices into app
// Remember to import useEffect from line 2
export const TechDemo = () => {
    
//Use States for adding a device via form
    const [device, setDevice] = useState();
    const [testName, setTestName] = useState();
    const [testList, setTestList] = useState();
    
    useEffect(() => {
        const listTest = async () => {
            const listTestResponse = await client.entities.test.list();
            console.log(listTestResponse?.items);
            setTestList(listTestResponse?.items);
    }
    listTest();
    }, [])

// Adding a device through code
    const addDeviceButton = async () => {
        const addDeviceResponse = await client.entities.test.add({
            Device: "Testing Programatically", 
            TestID: 123
        })
        console.log(addDeviceResponse);
    }

// Adding a device throug input form
    const addDeviceForm = async () => {
        const addDeviceResponse = await client.entities.test.add({
            Device: device, 
            TestName: testName
        })
        console.log(addDeviceResponse);
    }
    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
    }

    const handleTestNameChange = (event) => {
        setTestName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addDeviceForm();
    }
    return(
        <div>
            <Header />
            <h2>KF Tech Demo </h2>
            <button onClick={() => {addDeviceButton()}}>Add Device</button>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                    <input
                        type="text"
                        name="Device"
                        value={device}
                        onChange={handleDeviceChange}
                        />
                    </div>
                    <div>
                    <input
                        type="text"
                        name="testName"
                        value={testName}
                        onChange={handleTestNameChange}
                        />
                    </div>
                    <input type="submit" />
                </form>
                <div>
                    {testList?.map((item, index) => (
                        <div key={index}>
                            {item.Device}
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    );


}

export default TechDemo;