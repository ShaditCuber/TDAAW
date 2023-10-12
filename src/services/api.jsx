import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateRandomName } from "../util";
import { LoremIpsum } from "lorem-ipsum";


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


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
    const random = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    const dog_name = generateRandomName()
    const dog = {
        // colocarle a cada mascota unn uuid
        id: dog_name +'-' +random,
        name: dog_name,
        description: lorem.generateWords(random),
        show_description : false,
    };
    dog.image = data.message || data[0].url;
    console.log(dog)
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
