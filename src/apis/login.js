const login = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
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
        console.error('Login error:', error);
    }

}

export default login