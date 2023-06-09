import { useEffect, useState } from 'react';
import './trains.css';
import { TrainCard } from 'components';

const Trains = () => {
    const [trains, setTrains] = useState([]);

    const register = async () => {
        try {
            const response = await fetch('http://104.211.219.98/train/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    // "Authorization": `Bearer ${}`
                },
                body: JSON.stringify({
                    "companyName": "Train Central",
                    "ownerName": "S. Sri Nivashini",
                    "rollNo": "19MSS048",
                    "ownerEmail": "sriniraj2310@gmail.com",
                    "accessCode": "Pilfsf"
                })
            });
            const {
                companyName,
                clientId,
                clientSecret
            } = await response.json();
            localStorage.setItem('companyName', companyName);
            localStorage.setItem('clientId', clientId);
            localStorage.setItem('clientSecret', clientSecret);
        } catch (error) {
            console.error(error);
        }
    }

    const getAuthToken = async () => {
        try {
            const response = await fetch('http://104.211.219.98/train/auth', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
  // "Authorization": `Bearer ${}`
},
body: JSON.stringify({
    "companyName": "Train Central",
    "clientId": localStorage.getItem('clientId'),
    "ownerName": "S. Sri Nivashini",
    "ownerEmail": "sriniraj2310@gmail.com",
    "rollNo": "19MSS048",
    "clientSecret": localStorage.getItem('clientSecret'),
})
});
const {
    access_token,
} = await response.json();
localStorage.setItem('access_token', access_token);
} catch (error) {
console.error(error)
}
}
const getTrains = async () => {
    try {
        const response = await fetch('http://104.211.219.98/train/trains', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        const trains = await response.json();
        setTrains(trains)
    } catch (error) {
        console.error(error)
    }
}
useEffect(() => {
    // register()
    // After register function runs, run the following getAuthToken() function and remove register() call from useEffect()
    // getAuthToken()
    // Once token is received, run the following method, getTrains()
    // getTrains()
}, [])

return (
    <div>
        {
            trains?.map(({ trainName, trainNumber, departureTime, seatsAvailable, price, delayedBy }, index) => (
                <TrainCard trainName={trainName} trainNumber={trainNumber} departureTime={departureTime} seatsAvailable={seatsAvailable} price={price} delayedBy={delayedBy}/>
            ))
        }
    </div>
)
}

export default Trains