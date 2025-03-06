import {Link} from 'react-router-dom';
import '../components/ImageCard.css';

function ImageCard({ image }) {
  return (
    <div className='col-md-4 mb-4'>
        <div className='card h-100 d-flex flex-column image-card'>
            {image.media_type === 'image' ? (
                <img src={image.url} alt={image.title} className='card-img-top' loading='lazy' style={{ height:'300px', objectFit:'cover' }} />
            ) : (
                <iframe src={image.url} title={image.title} className='w-100' height='300'></iframe>
            )}

            <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{image.title}</h5>
                <p className='card-text'>{image.date}</p>
                <Link to={`/details/${image.date}`} className='btn btn-primary mt-auto'>View Details</Link>
            </div>
        </div>
    </div>
  )
}

export default ImageCard
