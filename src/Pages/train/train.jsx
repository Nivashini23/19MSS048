import { useEffect, useState } from 'react';
import './train.css';
import { useHistory } from 'react-router-dom';

const Train = () => {
    const history = useHistory();

    const [train, setTrain] = useState({});

    const getTrainData = async () => {
        try {
            const response = await fetch(`http://104.211.219.98/train/trains/${history.state.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const train = await response.json();
            setTrain(train)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // getTrainData()
    }, [])

    return (
        <div className='trainCardNew'>
            <div className='title'><p>{train?.trainNumber} - {train?.trainName}</p></div>
            <p>Departure: {train?.departureTime?.Hours}:{train?.departureTime?.Minutes}:{train?.departureTime?.Seconds}</p>
            <p>AC Seat Availability: {train?.seatsAvailable?.AC}</p>
            <p>AC Seat Price: {train?.price?.AC}</p>
            <p>Sleeper Seat Availability: {train?.seatsAvailable?.sleeper}</p>
            <p>Sleeper Seat Price: {train?.price?.sleeper}</p>
            <p className={train?.delayedBy > 0 && 'red'}>Delayed By: {train?.delayedBy}</p>
        </div>
 )
}

export default Train