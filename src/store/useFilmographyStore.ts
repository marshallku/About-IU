import create from "zustand";

const useFilmographyStore = create<FilmographyStore>((set) => ({
    fetchList: async () => {
        const response = await fetch(
            `${import.meta.env.BASE_URL}/data/filmography.json`
        );
        const json = await response.json();

        set((state) => ({ ...state, data: json }));
    },
}));

export default useFilmographyStore;
