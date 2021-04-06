// Implementations for all the calls for the pokemon endpoints.
import Api from "../services/Api";

// Method to get a list of all Pokemon
export const getPokemonList = async () => {
	try {
		const response = await Api.get("/pokemon?limit=500");
		return response.results;
	} catch (error) {
		console.error(error);
	}
};

// Get a pokemon details by name
export const getPokemonByName = async (name) => {
	try {
		const response = await Api.get(`/pokemon/${name}`);
		return response;
	} catch (error) {
		console.error(error);
	}
};
