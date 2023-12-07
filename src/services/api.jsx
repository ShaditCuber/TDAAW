import { useQuery } from "@tanstack/react-query";
import { obtenerCandidato } from "../queries/queries";


export function useLoadDog(perroId) {
  return useQuery(["dog", perroId], loadDog, {
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: false,
  });

}

// const url_foto = dog.image;
// const img = new Image();
// img.src = url_foto;
// img.onload = () => {
//   dog.image = url_foto;
// }
// img.onerror = () => {
//   dog.image = 'https://via.placeholder.com/300x300?text=No+image+found';
// }


export const loadDog = async ({ queryKey }) => {
  const [queryName, perroId, isCat] = queryKey;
  const new_dog = await obtenerCandidato();
  console.log(new_dog,'Candidate')
  let dog = null;

  try {
    dog = {
      id: new_dog.candidato.id,
      name: new_dog.candidato.nombre,
      description: new_dog.candidato.descripcion,
      image: new_dog.candidato.url_foto,
    };
  } catch (error) {
    return dog;
  }
 
  

  return dog;
}
