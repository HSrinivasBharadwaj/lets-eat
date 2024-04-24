import axios from 'axios'
import {useEffect, useState} from 'react';
import {SWIGGY_URI} from '../utils/constants';

const useFetchCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories()
  },[])
  const fetchCategories = async () => {
    setLoading(true);
    try {
        const response = await axios.get(SWIGGY_URI);
        setCategories(response.data.data.cards[0].card.card.gridElements.infoWithStyle);
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
    }
  }
  return {error,categories,loading}
  
}

export default useFetchCategories