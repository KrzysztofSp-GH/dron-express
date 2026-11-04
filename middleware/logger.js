const logger = (req, res, next) => {
    const data = new Date().toLocaleString('pl-PL');
    console.log(`[${data}] ${req.method} ${req.url}`);
    
    next(); 
};

module.exports = logger;
