/**
 * operacion-matriz
 * Operaciones de la matriz
 *
 * @author Carlos Palacios
 */

import * as Hapi from "@hapi/hapi";
import { operacionMatrizRoutes } from './routes/operacion-matriz.route';
import { contextServerMiddleware, responseHeadersMiddleware } from './middleware/context';
import { HealthPlugin } from 'hapi-k8s-health'
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as HapiSwagger from "hapi-swagger";

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0'
  });

  // Registra el path /liveness y /readiness para que se puedan hacer pruebas de salud
  await server.register({
    plugin: HealthPlugin,
    options: {
      livenessProbes: {
        status: () => Promise.resolve('OK')
      },
      readinessProbes: {
        // Implementación del rediness según corresponda
        //service: () => Promise.resolve('OK')
      }
    }
  });

  // Contexto de la aplicación
  contextServerMiddleware(server);
  // Headers de respuesta
  responseHeadersMiddleware(server);
  // Inicia los routes
  operacionMatrizRoutes(server);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "API MATRIZ",
          version: "1.0",
          description: 'Funcionalidades para las operaciones de Matriz',
        },
      },
    },
  ]);

  // Inicia el servidor
  await server.start();
  console.info(`[operacion-matriz] Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
