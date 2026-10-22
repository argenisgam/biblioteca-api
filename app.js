require('dotenv').config();
const express=require('express')
const logger=require('./middlewares/logger')
const app = express();
const corsMiddleware = require("./middlewares/corsMiddleware");
app.use(corsMiddleware);

const PORT = 3000;
//const pool = require('./config/db');
const usuarioRoutes=require('./routes/usuarios.routes');
const libroRoutes=require('./routes/libro.routes');
const prestamoRoutes=require('./routes/prestamo.routes');
const authRoutes=require('./routes/auth.routes');
const rolRoutes = require("./routes/rol.routes");

const handleError = require("./middlewares/handleError");

// Middleware para leer JSON

app.use(handleError);
app.use(express.json());
app.use(logger.logger);

app.use('/usuarios', authenticate(),usuarioRoutes);
app.use('/libros',authenticate(),libroRoutes);
app.use('/prestamos',prestamoRoutes);
app.use('/auth',authRoutes);
app.use("/roles", rolRoutes);

app.use(handleError);

app.listen(PORT, () => {
console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
