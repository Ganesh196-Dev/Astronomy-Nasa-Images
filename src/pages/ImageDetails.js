import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import '../pages/ImageDetails.css'

const API_KEY = 'ayOaBtk7QChM9F4DaPBZ8IhBfdmIhbM3CWLcR5gb';
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;


function ImageDetails() {

    const {date} = useParams();
    const [image, setImage] = useState(null);

    useEffect(() =>{
        const fetchDetails = async () =>{
            try{
                const response = await axios.get(`${API_URL}&date=${date}`);
                setImage(response.data);
            }catch(error){
                console.error('Error fetching image details:', error);
            }
        };

        fetchDetails();
    }, [date]);

    if(!image) return <p>Loading...</p>
    
    return (
    <div className='container-fluid bg-dark text-light min-vh-100 py-5 px-5 text-center'> 
        {/* <div className="container-fluid bg-dark text-light min-vh-100 py-4"></div> */}
        <h1 className='mb-4 text-center'>{image.title}</h1>
        {image.media_type === 'image' ? (
            <img src={image.url} alt={image.title} className='img-fluid mb-4 image-Detail' style={{ maxHeight:'300px', maxWidth:'100%', objectFit:'cover' }} />
        ) : (
            <iframe src={image.url} title={image.title} className='w-100 mb-4' height='500'></iframe>
        )}
        <p>{image.explanation}</p>
        <h6 className='text-center'>{image.date}</h6>
        <h4 className='text-center'>{image.copyright && <p>© {image.copyright}</p>}</h4>
    </div>
  );
}

export default ImageDetails
