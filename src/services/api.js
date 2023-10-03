import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateRandomName } from "../util";

export const loadDog = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log('data',data)
    // const dog = {
    //     name: generateRandomName(),
    //     image: data.message,
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    // };
    // console.log('aqui tody') 
    // console.log(dog)
    // const response = await axios.get(dog.image);
    // if (response.status !== 200) {
    //     dog.image = 'https://via.placeholder.com/300x300?text=No+image+found';
    // }
    // return dog;
}


export function useLoadDog() {
    return useQuery(["dog"], loadDog , {refetchOnWindowFocus: false , retry: 1});
}