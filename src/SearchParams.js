import React, {useState, useEffect } from "react";
import pet, {ANIMALS} from "@frontendmasters/pet"
import useDropdown from './useDropdown';

const SearchParams= () => {
    const [location, setLocation] = useState("Seattle, Wa");
    const [breeds, setBreeds] = useState([])
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    const [pets, setPets] = useState([]);

    async function requestPets() {
        const {animals} = await pet.animals({
            location,
            breed,
            type: animal
        })
    }

    useEffect(() => {
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({breeds : apiBreeds}) => {
            const breedString = apiBreeds.map(({name}) => name);
            setBreeds(breedString);
        },console.error)
    }, [animal, setBreed, setBreeds])

    return (
        <div className="search-params">
            <h1>{location}</h1>
            <form >
                <label htmlFor="location">
                    location
                    <input 
                        id="location" 
                        value={location} 
                        placeholder="Location" 
                        onChange={e => setLocation(e.target.value)}
                    />
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams;