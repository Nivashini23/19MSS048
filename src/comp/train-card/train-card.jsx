import './train-card.css';

const TrainCard = ({ trainName, trainNumber, departureTime: {Hours, Minutes, Seconds}, seatsAvailable: {AC, sleeper}, price, delayedBy, onClick }) => {
  return (
    <div className='trainCard' onClick={onClick}>
        <div className='title'><p>{trainNumber} - {trainName}</p></div>
        <p>Departure: {Hours}:{Minutes}:{Seconds}</p>
        <p>AC Seat Availability: {AC}</p>
        <p>AC Seat Price: {price.AC}</p>
        <p>Sleeper Seat Availability: {sleeper}</p>
        <p>Sleeper Seat Price: {price.sleeper}</p>
        <p className={delayedBy > 0 && 'red'}>Delayed By: {delayedBy} mins</p>
    </div>
  )
}

export default TrainCard