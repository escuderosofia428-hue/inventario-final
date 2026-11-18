# Plan de pruebas

| ID | Caso | Resultado esperado |
|---|---|---|
| P01 | Iniciar sesión con credenciales correctas | Acceso al panel |
| P02 | Iniciar sesión con clave incorrecta | Acceso rechazado |
| P03 | Crear producto con nombre y valores válidos | Producto guardado |
| P04 | Crear producto sin nombre | Validación rechaza la operación |
| P05 | Guardar precio negativo | Validación rechaza la operación |
| P06 | Guardar stock negativo | Validación rechaza la operación |
| P07 | Buscar producto por nombre | Se muestran coincidencias |
| P08 | Registrar entrada | El stock aumenta y queda movimiento |
| P09 | Registrar salida válida | El stock disminuye y queda movimiento |
| P10 | Retirar más unidades que las disponibles | Se rechaza y el stock no cambia |
| P11 | Stock igual al mínimo | Se muestra estado Stock bajo |
| P12 | Consultar historial | Muestra producto, tipo, cantidad y fecha |
| P13 | Eliminar producto con movimientos | Se rechaza para conservar historial |
