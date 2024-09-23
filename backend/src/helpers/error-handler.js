function errorHandler(err,req,res,next){
    console.log(err)
    if(err.name==='UnauthorizedError'){
      return res.status(401).json({message:"User is not authorized"})
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate key error' });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    // Default error handler
    return res.status(500).json(err);
  }

  module.exports = errorHandler;