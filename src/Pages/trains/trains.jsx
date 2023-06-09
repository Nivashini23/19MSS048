import { useEffect, useState } from 'react';
import './trains.css';
import { useHistory } from 'react-router-dom';
import { TrainCard } from 'comp';

const Trains = () => {
    const history = useHistory();

    const [trains, setTrains] = useState([
            {
                trainName: "Chennai Exp",
                trainNumber: "2344",
                departureTime: {
                    Hours: 21,
                    Minutes: 35,
                    Seconds: 0
                },
                seatsAvailable: {
                    sleeper: 3,
                    AC: 1
                },
                price: {
                    sleeper: 2,
                    AC: 5
                },
                delayedBy: 15
            },
            {
                trainName: "Hyderabad Exp",
                trainNumber: "2341",
                departureTime: {
                    Hours: 23,
                Minutes: 55,
                Seconds: 0
            },
            seatsAvailable: {
                sleeper: 6,
                AC: 7
            },
            price: {
                sleeper: 554,
                AC: 1854
            },
            delayedBy: 0
        },
    ]
             );
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
                    "companyName": localStorage.getItem('companyName'),
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
        getAuthToken()
        getTrains()
    }, [])

    return (
        <div className='trains'>
            <h1>{localStorage.getItem('companyName') || 'Train Central'} - Trains Schedule</h1>
            <div className='trainsContent'>
                {
                    trains?.map(({ trainName, trainNumber, departureTime, seatsAvailable, price, delayedBy }, index) => (
                        <TrainCard trainName={trainName} trainNumber={trainNumber} departureTime={departureTime} seatsAvailable={seatsAvailable} price={price} delayedBy={delayedBy} onClick={() => history.push(`/train/${trainNumber}`)} />
                    ))
                }
            </div>
        </div>
    )
}

export default Trains