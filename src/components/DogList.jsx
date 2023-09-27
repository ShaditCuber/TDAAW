// DogList.js
import { Card, Typography, Button } from '@mui/material';
import DogCard from './Mi';
// import DogCard from './DogCard';


function DogList({ dogs, title, onUndo }) {
    return (
        <>
            <div style={{ overflowY: 'scroll', height: '500px'}}>
                {dogs.map((dog, index) => (
                    // <DogCard key={index} dog={dog} onUndo={() => onUndo(dog)} />
                    <DogCard key={index} dogData={dog} />

                ))}
            </div>
        </>
    );
}

export default DogList;
