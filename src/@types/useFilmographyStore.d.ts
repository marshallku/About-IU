interface FilmographyItem {
    title: string;
    date: string;
    name: string;
    image?: string;
    video?: string;
    category: string;
}

type FilmographyList = FilmographyItem[];

interface FilmographyStore {
    data?: FilmographyList;
    fetchList: () => Promise<void>;
}
