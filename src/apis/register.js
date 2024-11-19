

const register = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/auth/register', {
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
        console.error('Register error:', error);
    }

}

export default register