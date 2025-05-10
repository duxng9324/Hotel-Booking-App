import { get } from '../utils/request'

export const getHotels = async () =>{
    return await get(`hotels`);
}

export const getHotelByID = async (id) =>{
    return await get(`hotels/${id}`);
}

export const getRating = async () =>{
    return await get(`hotels`);
}

