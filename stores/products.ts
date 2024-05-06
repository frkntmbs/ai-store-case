import create from 'zustand';

type sortTypes = "priceASC" | "priceDESC" | "createdAtASC" | "createdAtDESC" | "";

interface ProductsState {
    products: Product[];
    favorites: number[];
    sortby: sortTypes;
    fetchProducts: () => void;
    setFavorites: (favorites: number[]) => void;
    getFavorites: () => Product[];
    toggleFavorite: (productId: number) => void;
    sortProducts: (sort: sortTypes) => void;
}

const useProductsStore = create<ProductsState>((set) => ({
    products: [],
    favorites: [],
    sortby: "",
    fetchProducts: async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();

            //if product images first image isn't hosted on i.imgur.com delete it from the list
            const filteredData = data.filter((product: Product) => product.images[0].includes("i.imgur.com"));

            //Sometimes there is a parse problem caused by the api in the data returned from the api above, so I removed some characters in the code below
            //([ + ] + \ + ")
            filteredData.forEach((product: Product) => {
                product.images = product.images.map((image: string) => image.replace(/\[|\]|\\|"/g, ""));
            });

            set({ products: filteredData });

            useProductsStore.getState().sortProducts(useProductsStore.getState().sortby);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
    setFavorites: (favorites) => {
        set({ favorites });
    },
    getFavorites: () => {
        let sortedProducts: Product[] = [];

        if (useProductsStore.getState().sortby) {
            sortedProducts = useProductsStore.getState().products.filter((product) => useProductsStore.getState().favorites.includes(product.id));

            return sortedProducts;
        }
        else {
            useProductsStore.getState().favorites.forEach((id) => {
                const product = useProductsStore.getState().products.find((product) => product.id === id);

                if (product) {
                    sortedProducts.push(product);
                }
            });
            return sortedProducts.reverse();

        }
    },
    toggleFavorite: (productId) => {
        set((state) => {
            if (state.favorites.includes(productId)) {
                return {
                    favorites: state.favorites.filter((id) => id !== productId),
                };
            }

            return {
                favorites: [...state.favorites, productId],
            };
        });

        localStorage.setItem("favorites", JSON.stringify(useProductsStore.getState().favorites));
    },
    sortProducts: (type) => {
        set({ sortby: type });

        switch (type) {
            case "priceASC":
                useProductsStore.getState().products.sort((a: Product, b: Product) => a.price - b.price);
                break;
            case "priceDESC":
                useProductsStore.getState().products.sort((a: Product, b: Product) => b.price - a.price);
                break;
            case "createdAtASC" || "":
                useProductsStore.getState().products.sort((a: Product, b: Product) => new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime());
                break;
            case "createdAtDESC":
                useProductsStore.getState().products.sort((a: Product, b: Product) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
                break;
            default:
                break;
        }
    }
}));

export default useProductsStore;