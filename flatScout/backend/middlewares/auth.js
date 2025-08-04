// Middleware to check if user is authenticated
export const auth = (req, res, next) => {
  try {
    const user = req.body.user || req.query.user || JSON.parse(req.headers['user']);
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Authentication failed.' });
  }
};
