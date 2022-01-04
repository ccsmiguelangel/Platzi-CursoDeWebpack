git init
npm init -y

src/index.js

### Instalar webpack:
`npm install webpack webpack-cli -D`

nota: -D para instalar solo en nuestro proyecto

### Ejecutar webpack
`npx webpack`

### Ejecutar webpack modo desarrollo y modo producción
Nota el modo desarrollo contiene comentarios mientras que el entorno de producción no lo contiene

`npx webpack --mode development`
`npx webpack --mode production`


### Ejecutar con config
`npx webpack --mode production --config webpack.config.js`

### Instalar babel
`npm i babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D`