import create from "zustand";

const useYoutubeStore = create<YoutubeStore>((set) => ({
    fetchList: async () => {
        const response = await fetch(
            `${import.meta.env.BASE_URL}/data/youtube.json`
        );
        const json = await response.json();

        set((state) => ({ ...state, data: json }));
    },
}));

export default useYoutubeStore;
