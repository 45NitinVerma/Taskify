// server.js
const app = require('./app');
const connectDB = require('./config/db');

const cors = require('cors');
app.use(cors({ 
    origin: 'http://localhost:3000', // Your React app's URL
    credentials: true 
}));

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});