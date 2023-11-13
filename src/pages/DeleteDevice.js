// Importing necessary libraries and components
import React, { useState, useEffect } from "react";
import { vendiaClient } from "../vendiaClient";
import Header from "../components/Header";

// Initialize the vendia client
const { client } = vendiaClient();

// Define the DeleteDevice component
export const DeleteDevice = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        // Define an async function to fetch devices
        const fetchDevices = async () => {
            const deviceList = await client.entities.test.getAll();
            // Update the devices state with the fetched list
            setDevices(deviceList);
        };

        // Call the fetchDevices function
        fetchDevices();
    }, []); // Empty dependency array ensures this useEffect runs once on component mount

    // Handler function to delete a device by its ID
    const handleDelete = async (deviceId) => {
        try {
            // Make the call to remove the device using the vendia client
            await client.entities.test.remove(deviceId);
            // Update the devices state by filtering out the deleted device
            setDevices(prevDevices => prevDevices.filter(device => device._id !== deviceId));
        } catch (error) {
            // Log the error if the deletion fails
            console.error("Failed to delete device:", error);
        }
    };
    
    return (
        <>
            <Header />
            <h2>Delete Devices</h2>
            <ul>
                {/* Map over the devices and render each one with a delete button */}
                {devices.map(device => (
                    <li key={device._id}>
                        {device.name} 
                        <button onClick={() => handleDelete(device._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

// Export the DeleteDevice component as default
export default DeleteDevice;
