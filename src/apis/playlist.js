export const getAllPlaylists = async () => {
    const response = await fetch('http://localhost:8080/playlists', {
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

export const createPlaylist = async (data) => {
    const response = await fetch('http://localhost:8080/playlists', {
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