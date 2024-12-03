export const countUser = async () => {
    try {
        const response = await fetch('http://localhost:8080/users/count', {
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