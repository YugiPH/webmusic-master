export const getAllPlaylists = async (data) => {
    const response = await fetch('http://localhost:8080/playlists/get-playlists', {
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

export const addSongToPlaylist = async (data) => {
    const response = await fetch('http://localhost:8080/playlists/addsong', {
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

export const getPlaylistById = async (id) => {
    const response = await fetch(`http://localhost:8080/playlists/${id}`, {
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

export const removeSongFromPlaylist = async (data) => {
    const response = await fetch(`http://localhost:8080/playlists/remove-song`, {
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });
    if (response.ok) {
        return response.json();

    }
    else if (!response.ok) {
        throw new Error('Internal from server');
    }
}