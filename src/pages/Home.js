import {useState, useEffect} from 'react'
import axios from 'axios';
import ImageCard from '../components/ImageCard';

const API_KEY = 'ayOaBtk7QChM9F4DaPBZ8IhBfdmIhbM3CWLcR5gb';
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;


function Home(){

    const[images,setImages] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const[mediaType, setMediaType] = useState('all');

    useEffect(() =>{
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try{
            const response = await axios.get(`${API_URL}&count=12`);
            setImages(response.data);
        }catch(error){
            console.error('Error fetching images:', error);
        }  
    };

    const handleSearch = async () => {
        if(searchTerm){
            try{
                const response = await axios.get(`${API_URL}&date=${searchTerm}`);
                setImages([response.data]);
            }catch(error){
                console.error('Error searching images:', error);
            }
        }else{
            fetchImages();
        }
    };

    const filteredImages = images.filter((img) =>
        mediaType === 'all' || img.media_type === mediaType
    );

  return (
    <div className='container-fluid bg-dark text-light min-vh-100 py-4 px-5 text-center'>
        <h1 className='mb-4'>NASA Astronomy Gallery</h1>
        <div className='mb-4 d-flex gap-3'>
            <input 
                type="text"
                placeholder="Search by date (YYYY-MM-DD)"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select onChange={(e) => setMediaType(e.target.value)} className='form-select col-xxl-1'>
                <option value="all">All</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
            </select>
            <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>

        <div className='row'>
            {filteredImages.map((img)=>(
                <ImageCard key={img.date} image={img} />
            ))}
        </div>

    </div>
  );
}

export default Home