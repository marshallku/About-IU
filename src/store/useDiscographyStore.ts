import create from "zustand";

const useDiscographyStore = create<DiscographyStore>((set) => ({
    fetchList: async () => {
        const response = await fetch(
            `${import.meta.env.BASE_URL}data/album.json`
        );
        const json = await response.json();

        set((state) => ({ ...state, data: json }));
    },
}));

export default useDiscographyStore;
