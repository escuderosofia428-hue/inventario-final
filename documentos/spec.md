# Especificación del Sistema de Gestión y Control de Inventario

## 1. Objetivo

Desarrollar un sistema web para administrar productos y controlar los movimientos de mercadería de un negocio de repuestos e insumos.

## 2. Usuarios

El sistema contará inicialmente con un usuario administrador que podrá acceder mediante credenciales.

## 3. Gestión de productos

Cada producto tendrá:
- Identificador único.
- Nombre.
- Precio.
- Cantidad disponible.
- Stock mínimo.

El administrador podrá registrar, consultar, modificar y eliminar productos, respetando las restricciones del sistema.

## 4. Búsqueda

El sistema permitirá buscar productos por su nombre.

## 5. Entradas de mercadería

El administrador podrá registrar entradas indicando:
- Producto.
- Cantidad.
- Fecha.

Al registrar una entrada, el stock aumentará automáticamente.

## 6. Salidas de mercadería

El administrador podrá registrar salidas indicando:
- Producto.
- Cantidad.
- Fecha.

El sistema comprobará que exista suficiente stock antes de realizar la operación.

## 7. Reglas de negocio

RN01. Cada producto tendrá un identificador único.

RN02. El nombre del producto será obligatorio.

RN03. El precio no podrá ser negativo.

RN04. El stock no podrá ser negativo.

RN05. Una entrada aumentará las unidades disponibles.

RN06. Una salida disminuirá las unidades disponibles.

RN07. No se permitirá retirar más unidades de las disponibles.

RN08. Cada movimiento quedará registrado.

RN09. Los productos con stock igual o inferior al mínimo se identificarán como stock bajo.

RN10. Las operaciones que modifiquen el stock deberán mantener actualizado el inventario.

## 8. Historial

El sistema permitirá consultar los movimientos realizados, mostrando producto, tipo de movimiento, cantidad y fecha.

## 9. Seguridad

El acceso estará protegido mediante autenticación.

Las contraseñas no se almacenarán en texto plano.

Las credenciales de conexión no se publicarán en el repositorio.

## 10. Tecnologías

- React.
- TypeScript.
- Node.js.
- Express.
- PostgreSQL.
- Git.
- GitHub.

## 11. Resultado esperado

Una aplicación web funcional, accesible desde internet, que permita gestionar productos, controlar existencias y registrar movimientos de mercadería.