import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateRandomName } from "../util";
import { LoremIpsum } from "lorem-ipsum";
import { obtenerCandidato } from "../queries/queries";
import { useUsuario } from "../context/AuthContext";


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


export function useLoadDog(perroId, isCat = false) {
  return useQuery(
    ["dog", perroId, isCat], loadDog, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: !!perroId, // Solo se habilita si perroId está presente
  });
}



export const loadDog = async ({ queryKey }) => {
  const [queryName, perroId, isCat] = queryKey;
  console.log(perroId, 'perroId')
  const new_dog = await obtenerCandidato(perroId);
  const dog = {
    id: new_dog.candidato.id,
    name: new_dog.candidato.nombre,
    description: new_dog.candidato.descripcion,
    image: new_dog.candidato.url_foto,
  };


  // const URL = {
  //     true: "https://api.thecatapi.com/v1/images/search",
  //     false: "https://dog.ceo/api/breeds/image/random"
  // }
  // const [queryName, paramsFilter] = isCat.queryKey;

  // const { data } = await axios.get(URL[paramsFilter]);
  // const random = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  // const dog_name = generateRandomName()
  // const dog = {
  //     // colocarle a cada mascota unn uuid
  //     id: dog_name +'-' +random,
  //     name: dog_name,
  //     description: lorem.generateWords(random),
  //     show_description : false,
  // };
  // dog.image = data.message || data[0].url;

  // // lulu2.jpg si el nombre es lulu2.jpg cambiar la imagen por una imagen de error
  // if (dog.image.includes('lulu2.jpg')) {
  //     dog.image = 'https://via.placeholder.com/300x300?text=No+image+found';
  // }

  try {
    const response = await axios.get(dog.image);
    if (response.status !== 200) {
      dog.image = 'https://via.placeholder.com/300x300?text=No+image+found';
    }

  } catch (error) {
    dog.image = 'https://via.placeholder.com/300x300?text=No+image+found';
  }

  return dog;
}
