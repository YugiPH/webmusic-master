const getAllSongs = async () => {
    const response = await fetch('http://localhost:8080/songs', {
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

export default getAllSongs