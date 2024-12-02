export const addArtist = async (data) => {
    const response = await fetch('http://localhost:8080/artists', {
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
}

export const getAllArtists = async () => {
    const response = await fetch('http://localhost:8080/artists', {
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
}