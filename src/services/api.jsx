import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateRandomName } from "../util";





export function useLoadDog(isCat=false) {
    return useQuery(
        ["dog",isCat], loadDog, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    });
}


export const loadDog = async (isCat = false) => {
    const URL = {
        true: "https://api.thecatapi.com/v1/images/search",
        false: "https://dog.ceo/api/breeds/image/random"
    }
    const [queryName, paramsFilter] = isCat.queryKey;

    console.log(URL[paramsFilter])
    const { data } = await axios.get(URL[paramsFilter]);
    const dog = {
        name: generateRandomName(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    dog.image = data.message || data[0].url;
    
    try {
        const response = await axios.get(dog.image);

        if (response.status !== 200) {
            dog.image = 'https://via.placeholder.com/300x300?text=No+image+found';
        }

    } catch (error) {
        console.error(error);
    }

    return dog;
}
