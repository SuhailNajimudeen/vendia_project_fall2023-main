import React from "react";
import { useEffect, useState} from "react";
import { vendiaClient } from "../vendiaClient";//use .. when file is diff pathway back

const { client } = vendiaClient();

export const Demo = () => {


    //useState 
    const [device, setDevice] = useState();
    const [testName, setTestName] = useState();
    const [testList, setTestList] = useState();

    useEffect(() => {
        // shows us what devices are being tested in the vendia website when we inspect consle on website
        const listTest = async() => {
            const listTestResponse = await client.entities.test.list();
            //question mark ensures if there is no .items nothing is called
            console.log(listTestResponse?.items);
            
            //.items are where actual arrays are stored
            setTestList(listTestResponse?.items)
    }  
    listTest();
    }, [])
 
    const addDevice = async () => {
        // name and list of atributes go inside add
        //when you add the test will appear on vendia website under entity explorer if done right 
        const addDeviceResponse = await client.entities.test.add({
            /*hard code example
            Device: "Testing programatically",
            TestID:  123
            */
           //state variable example
            Device: device,
            TestName: testName
        })
        console.log(addDeviceResponse);
    }

    //2 functions that track whenever something is typed in our form boxes they will update the useState variables above
    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
        //console.log(device); will let you see if variable is working in console

    }

    const handleTestNameeChange = (event) => {
        setTestName(event.target.value);
        //console.log(testName);

    }

    //whenever submit goes through will add device
    const handleSubmit = (event) => {
        //good to have to prevent a refresh occuring and wiping data
        event.preventDefault();
        addDevice();
        
    }
    

    return (
        //BUTTON to add button to website type button and onClick lets you put a function to run when button is pressed
        //DIV anything inside of div will show up in website
        //FORM allows to collect user input
        //onSubmit when a form is submitted will run function
        //down on testlist is showing our devices in entities explorer on vendia page on the site
        <div>
            Testing page
            <div>
                <button onClick={() => {addDevice()}}> Add Device</button>
                <form onSubmit ={handleSubmit}>
                    <div>
                        <input 
                        type="text"
                        name = "Device"
                        placeholder="Enter device name here"
                        value ={device}
                        onChange={handleDeviceChange}
                    />
                    </div>
                
                    <div>
                    <input  
                        type="text"
                        name = "testName"
                        placeholder="Enter test name here"
                        value ={testName}
                        onChange={handleTestNameeChange} 
                    />
                    </div>
                    <input type="submit" />
                </form>
                <div>
                    {testList?.map((item, index)=> (
                        <div key={index}>
                            {item?.Device}

                        </div>

                    )
                    )}

                </div>
            </div>
        </div>
    )
}


