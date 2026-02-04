import { createContext, useEffect, useState } from "react";
import { placeService } from "../../services/index.js";

export const PlaceContext = createContext({
    places: [],
    async createPlace(placeData) { },
    getPlaceById(placeId) { },
});

export function PlaceProvider({ children }) {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        placeService.getAll()
            .then((data) => setPlaces(data))
            .catch((err) => console.error('Error fetching places:', err));
    }, []);

    const createPlace = async (placeData) => {
        try {
            const newPlace = await placeService.create(placeData);

            setPlaces((oldPlaces) => [...oldPlaces, newPlace]);
        } catch (err) {
            console.error('Error creating place:', err);
        }
    };

    const getPlaceById = (placeId) => {
        return places.find(p => p.id === placeId);
    }

    const contextValue = {
        places,
        createPlace,
        getPlaceById,
    };

    return (
        <PlaceContext.Provider value={contextValue}>
            {children}
        </PlaceContext.Provider>
    )
}
