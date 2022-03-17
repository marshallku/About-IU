interface DiscographyItem {
    name: string;
    category: string;
    releaseDate: string;
    image: string;
}

type DiscographyList = DiscographyItem[];

interface DiscographyStore {
    data?: DiscographyList;
    fetchList: () => Promise<void>;
}
