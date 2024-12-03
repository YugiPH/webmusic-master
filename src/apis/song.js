export const countSong = async () => {
    try {
        const response = await fetch('http://localhost:8080/songs/count', {
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

export const searchSong = async (title) => {
    try {
        const response = await fetch('http://localhost:8080/songs/search' + new URLSearchParams({
            search: title
        }).toString(),
            {
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