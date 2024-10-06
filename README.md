DESAFIO 1 - PED CICLO 2 2024

# Integrantes

- Eduardo Ezequiel López Rivera - LR230061
- Diego Guillermo Esnard Romero - ER231474

# Instrucciones para ejecutar el proyecto

- Se necesita la versión 20.17.0 LTS o superior de Node.js
- Ejecutar `npm install` para instalar dependencias

# En modo desarrollo

Para ejecutar una instancia del servidor de desarrollo, ejecutar los siguientes comandos:

- Ejecutar `npm run dev` para ejecutar la aplicación web, estará disponible de forma local en http://localhost:5173/
- Ejecutar `npm run json-db` en otra terminal para ejecutar json-server y poder trabajar con la API REST y la data del archivo db.json

# En modo producción

Para ejecutar una instancia del servidor en producción, ejecutar los siguientes comandos:

- Ejecutar `npm run build` para construir la aplicación
- A partir de este punto, tendremos generada la carpeta `/dist` que contiene la aplicación web lista para producción, por consecuente necesitamos servir estos archivos con la ayuda de una herramienta, utilizaremos `serve`, ejecutamos los siguientes comandos en la carpeta principal del proyecto:

> ```sh
> npm install -g serve
> serve -s dist -l 5000
> ```

- No olvidar ejecutar `npm run json-db` en otro terminal para tener disponible la API REST. Asi tendríamos la aplicación corriendo en el puerto 5000.
