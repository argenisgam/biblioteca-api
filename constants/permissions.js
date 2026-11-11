const PERMISSIONS = Object.freeze({
  BOOK_READ: 'libro.consultar',
  BOOK_CREATE: 'libro.crear',
  BOOK_UPDATE: 'libro.actualizar',
  BOOK_DELETE: 'libro.eliminar',
  READER_READ: 'usuario.consultar',
  READER_CREATE: 'usuario.crear',
  READER_UPDATE: 'usuario.actualizar',
  READER_DELETE: 'usuario.eliminar',
  LOAN_READ: 'prestamo.consultar',
  LOAN_CREATE: 'prestamo.crear',
  LOAN_RETURN: 'prestamo.devolver',
  ROLE_READ: 'rol.consultar',
  ROLE_CREATE: 'rol.crear',
  ROLE_UPDATE: 'rol.actualizar',
  ROLE_DELETE: 'rol.eliminar'
});

const PERMISSION_DEFINITIONS = Object.freeze([
  [PERMISSIONS.BOOK_READ, 'Consultar el catálogo de libros'],
  [PERMISSIONS.BOOK_CREATE, 'Crear libros'],
  [PERMISSIONS.BOOK_UPDATE, 'Actualizar libros'],
  [PERMISSIONS.BOOK_DELETE, 'Eliminar libros'],
  [PERMISSIONS.READER_READ, 'Consultar lectores'],
  [PERMISSIONS.READER_CREATE, 'Crear lectores'],
  [PERMISSIONS.READER_UPDATE, 'Actualizar lectores'],
  [PERMISSIONS.READER_DELETE, 'Eliminar lectores'],
  [PERMISSIONS.LOAN_READ, 'Consultar préstamos'],
  [PERMISSIONS.LOAN_CREATE, 'Crear préstamos'],
  [PERMISSIONS.LOAN_RETURN, 'Registrar devoluciones'],
  [PERMISSIONS.ROLE_READ, 'Consultar roles'],
  [PERMISSIONS.ROLE_CREATE, 'Crear roles'],
  [PERMISSIONS.ROLE_UPDATE, 'Actualizar roles'],
  [PERMISSIONS.ROLE_DELETE, 'Eliminar roles']
]);

module.exports = { PERMISSIONS, PERMISSION_DEFINITIONS };
