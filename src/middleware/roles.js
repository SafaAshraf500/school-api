const allowRoles = (...roles) => {
    return (req, res, next) => {
        const { user } = req;

        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }
        if (!roles.includes(user.role)) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        next();
    };
};

module.exports = allowRoles;