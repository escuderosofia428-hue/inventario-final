# Informe de pruebas – Sistema de Inventario

## 1. Objetivo

El objetivo de este documento es registrar las pruebas realizadas al sistema de inventario para comprobar que sus funciones principales trabajen correctamente y que los datos se guarden de manera adecuada.

## 2. Entorno de pruebas

- Frontend: React, TypeScript y Vite.
- Backend: Node.js, Express y TypeScript.
- Base de datos: PostgreSQL.
- Base de datos alojada en Neon.
- Backend publicado en Render.
- Frontend publicado en Netlify.

## 3. Dirección de la aplicación

- Aplicación: https://inventario-final-0vqcr.netlify.app
- Backend: https://inventario-final-nlv5.onrender.com
- Comprobación de API: https://inventario-final-nlv5.onrender.com/api/health

## 4. Casos de prueba realizados

| Código | Prueba | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| P01 | Iniciar sesión con datos correctos | Permitir el ingreso al sistema | Aprobada |
| P02 | Iniciar sesión con contraseña incorrecta | Rechazar el acceso | Aprobada |
| P03 | Crear un producto válido | Guardar el producto correctamente | Aprobada |
| P04 | Crear un producto sin nombre | Mostrar un mensaje de validación | Aprobada |
| P05 | Ingresar un precio negativo | Rechazar el valor ingresado | Aprobada |
| P06 | Ingresar un stock negativo | Rechazar el valor ingresado | Aprobada |
| P07 | Buscar un producto | Mostrar los productos que coincidan con la búsqueda | Aprobada |
| P08 | Registrar una entrada de mercadería | Aumentar el stock y guardar el movimiento | Aprobada |
| P09 | Registrar una salida de mercadería | Disminuir el stock y guardar el movimiento | Aprobada |
| P10 | Registrar una salida mayor al stock disponible | Rechazar la operación y mantener el stock | Aprobada |
| P11 | Alcanzar el stock mínimo | Mostrar la advertencia de stock bajo | Aprobada |
| P12 | Consultar el historial de movimientos | Mostrar los movimientos registrados | Aprobada |
| P13 | Eliminar un producto que tiene movimientos | Impedir la eliminación si existen movimientos asociados | Aprobada |

Resultado final: 13 pruebas aprobadas y 0 pruebas fallidas.

## 5. Pruebas generales realizadas

También se comprobó el funcionamiento general de la aplicación publicada:

- El inicio de sesión permite ingresar al sistema.
- Se pueden agregar productos.
- Se pueden registrar movimientos de entrada.
- Las entradas aumentan el stock.
- Se pueden registrar movimientos de salida.
- Las salidas disminuyen el stock.
- El sistema muestra advertencias cuando hay poco stock.
- Se pueden buscar productos.
- Se puede consultar el historial de movimientos.
- Los datos permanecen guardados al actualizar la página.

Todas las funciones fueron probadas y funcionaron correctamente.

## 6. Observaciones

Durante las pruebas se comprobó que el frontend, el backend y la base de datos se encuentran conectados y funcionando correctamente.

La API responde correctamente y la aplicación permite iniciar sesión y trabajar con los productos y sus movimientos.

No se registraron pruebas fallidas.

## 7. Conclusión

Las pruebas realizadas permitieron comprobar que el sistema de inventario cumple con las funciones solicitadas. Se verificó el inicio de sesión, la administración de productos, los movimientos de entrada y salida, las validaciones, las alertas de stock bajo y el historial de movimientos.

El sistema se encuentra publicado y accesible desde internet. Los 13 casos de prueba fueron aprobados, por lo que se considera completada la etapa de pruebas.