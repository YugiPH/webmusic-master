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

export const getFavoriteSong = async (userId) => {
    try {
        const response = await fetch('http://localhost:8080/users/getfavorite', {
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
        console.error('AddFavorite error:', error);
    }
}