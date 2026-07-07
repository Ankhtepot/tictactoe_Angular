# TicTacToe

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build

ng build --prod --base-href=/tictactoe-Angular/ /*might be obsolete*/
ng build --configuration production --base-href=/tictactoe-Angular/

```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deploying on gh-pages

```bash
npx angular-cli-ghpages --dir=dist/tic-tac-toe/browser
```
