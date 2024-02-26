function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // If not authenticated, send a JSON response with a 401 Unauthorized status
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = ensureAuthenticated;
