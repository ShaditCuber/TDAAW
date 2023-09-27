import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

function DogCard({ dog, onUndo }) {
    return (
        <Card sx={{ position: 'relative' }}>
            <CardMedia component="img" alt="Dog" height="150" image={dog.image} />
            <CardContent sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 2, position: 'absolute',
                top: 0,
            }}>
                <Typography variant="h6" color='white'>{dog.name}</Typography>
                <Button onClick={onUndo}>Arrepentirse</Button>
            </CardContent>
        </Card>
    );
}

export default DogCard;
