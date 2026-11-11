const sequelize = require('../config/database');
const { Usuario, User, Rol } = require('../models');
const BusinessError = require('../errors/BusinessError');


exports.getAll = async ()=>{
    return await Usuario.findAll();
};
exports.getById = async (id)=>{
    return await Usuario.findByPk(id);
};

exports.create = async (payload = {}) => {
    const { nombre, correo, username, password } = payload;
    const readerName = typeof nombre === 'string' ? nombre.trim() : '';
    const email = typeof correo === 'string' ? correo.trim().toLowerCase() : '';
    const accountName = typeof username === 'string' ? username.trim() : '';

    if (!readerName || !email || !accountName || typeof password !== 'string') {
        throw new BusinessError('Completa el nombre, el correo, el usuario y la contraseña.');
    }
    if (accountName.length < 3 || accountName.length > 50) {
        throw new BusinessError('El usuario debe tener entre 3 y 50 caracteres.');
    }
    if (password.length < 12) {
        throw new BusinessError('La contraseña debe tener al menos 12 caracteres.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new BusinessError('Ingresa un correo electrónico válido.');
    }

    const role = await Rol.findOne({ where: { nombre: 'Usuario' } });
    if (!role) {
        throw new Error('No existe el rol Usuario. Ejecuta npm run admin:create para inicializar los roles.');
    }

    try {
        return await sequelize.transaction(async (transaction) => {
            const account = await User.create({
                username: accountName,
                email,
                password,
                rol_id: role.id
            }, { transaction });

            return await Usuario.create({
                nombre: readerName,
                correo: email
            }, { transaction });
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new BusinessError('Ya existe una cuenta o un lector con ese usuario o correo.');
        }
        throw error;
    }
};


exports.update = async (id, dataUsuario) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            const usuario = await Usuario.findByPk(id, { transaction });
            if (!usuario) return null;

            const correoAnterior = usuario.correo;
            usuario.nombre = dataUsuario.nombre;
            usuario.correo = typeof dataUsuario.correo === 'string'
                ? dataUsuario.correo.trim().toLowerCase()
                : dataUsuario.correo;
            await usuario.save({ transaction });

            const account = await User.findOne({ where: { email: correoAnterior }, transaction });
            if (account) {
                account.email = usuario.correo;
                await account.save({ transaction });
            }
            return usuario;
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new BusinessError('Ya existe una cuenta o un lector con ese correo.');
        }
        throw error;
    }
};

exports.delete = async (id) => {
    return await sequelize.transaction(async (transaction) => {
        const usuario = await Usuario.findByPk(id, { transaction });
        if (!usuario) return null;

        await User.destroy({ where: { email: usuario.correo }, transaction });
        await usuario.destroy({ transaction });
        return usuario;
    });
};
