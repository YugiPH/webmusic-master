export const addFavoriteSong = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/users/addfavorite', {
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        if (response.ok) {
            return response.json();

        }
        else if (!response.ok) {
            throw new Error('Internal from server');
        }
    } catch (error) {
        console.error('AddFavorite error:', error);
    }
}

export const getFavoriteId = async (userId) => {
    try {
        const response = await fetch('http://localhost:8080/users/getfavoriteid', {
            body: JSON.stringify({ userId }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        if (response.ok) {
            return response.json();

        }
        else if (!response.ok) {
            throw new Error('Internal from server');
        }
    } catch (error) {
        console.error('AddFavorite Id error:', error);
    }
}

export const removeFavoriteSong = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/users/remove-favorite', {
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        if (response.ok) {
            return response.json();

        }
        else if (!response.ok) {
            throw new Error('Internal from server');
        }
    } catch (error) {
        console.error('Remove favorite error:', error);
    }
}

export const getFavoriteSongs = async (favoriteId) => {
    try {
        const response = await fetch('http://localhost:8080/songs/favorite', {
            body: JSON.stringify({ favoriteId }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        if (response.ok) {
            return response.json();

        }
        else if (!response.ok) {
            throw new Error('Internal from server');
        }
    } catch (error) {
        console.error('Get Favorite songs error:', error);
    }
}
