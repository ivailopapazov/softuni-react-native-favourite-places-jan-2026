import { createContext, useEffect, useState } from "react";
import { placeService } from "../../services/index.js";

export const PlaceContext = createContext({
    places: [],
    async createPlace(placeData) { },
    getPlaceById(placeId) { },
    deletePlace(placeId) { },
    sortPlace(placeId, newIndex) { },
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

    const deletePlace = async (placeId) => {
        try {
            await placeService.deletePlace(placeId);
            setPlaces((oldPlaces) => oldPlaces.filter(place => place.id !== placeId));
        } catch (err) {
            console.error('Error deleting place:', err);
        }
    }

    const sortPlace = (placeId, newIndex) => {
        setPlaces((oldPlaces) => {
            const index = oldPlaces.findIndex(place => place.id === placeId);

            if (index === -1) return oldPlaces;

            if (newIndex < 0 || newIndex >= oldPlaces.length) return oldPlaces;

            const updatedPlaces = [
                ...oldPlaces.slice(0, index),
                ...oldPlaces.slice(index + 1),
            ];

            updatedPlaces.splice(newIndex, 0, oldPlaces[index]);

            return updatedPlaces;
        });
    };

    const contextValue = {
        places,
        createPlace,
        getPlaceById,
        deletePlace,
        sortPlace,
    };

    return (
        <PlaceContext.Provider value={contextValue}>
            {children}
        </PlaceContext.Provider>
    )
}
