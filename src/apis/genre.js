export const getGenres = async () => {
    try {
        const response = await fetch('http://localhost:8080/genres', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
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

export const createGenre = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/genres', {
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
        console.error('Get Favorite songs error:', error);
    }
}

export const getGenreById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/genres/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        if (response.ok) {
            return response.json();

        }
        else if (!response.ok) {
            throw new Error('Internal from server');
        }
    } catch (error) {
        console.log(error.message)
    }
}
