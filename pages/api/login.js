

const login = (req, res) => {
    if (!req.body) return res.status(400).json({
        messageType: 'error',
        message: 'Invalid input'
    });
    const { username, password } = req.body;
}