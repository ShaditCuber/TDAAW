
// eslint-disable-next-line react/prop-types
export default function DogCard({ name, description, image }) {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
        </div>

    );
}