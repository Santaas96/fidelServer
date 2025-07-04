import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  errorApiSchema,
  makeApiResponseSchema,
} from "../schemas/apiResponseSchema";
import {
  CreateRedemptionSchema,
  CreateRedemtionResponseSchema,
  GetRedemptionSchema,
  RedemptionFiltersSchema,
  RedemptionSchema,
  UpdateRedemptionParamsSchema,
  UpdateRedemptionSchema,
} from "../../../infrastructure/validators/redemptionsValidators";

const REDEMPTIONS_CONTROLLER_TAG = ["Redemptions"];

export const redemptionsRegistry: RouteConfig[] = [
  {
    method: "get",
    path: `/api/v1/redemptions`,
    tags: REDEMPTIONS_CONTROLLER_TAG,
    summary: "Obtiene lista de canjes filtrados",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      query: RedemptionFiltersSchema,
    },
    responses: {
      201: {
        description: "Canjes obtenidos exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(GetRedemptionSchema),
          },
        },
      },
      400: {
        description: "Error interno del servidor",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
  {
    method: "post",
    path: `/api/v1/redemptions`,
    tags: REDEMPTIONS_CONTROLLER_TAG,
    summary: "Realiza un nuevo canje",
    security: [{ bearerAuth: [] }], // Para que se vea el candado en swagger y poder autenticar
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateRedemptionSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Canje realizado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(CreateRedemtionResponseSchema),
          },
        },
      },
      400: {
        description: "Error de validación",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
  {
    method: "patch",
    path: `/api/v1/redemptions/{id}`,
    tags: REDEMPTIONS_CONTROLLER_TAG,
    summary: "Actualiza el estado de un canje",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: UpdateRedemptionSchema,
          },
        },
      },
      params: UpdateRedemptionParamsSchema,
    },
    responses: {
      200: {
        description: "Estado del canje actualizado exitosamente",
        content: {
          "application/json": {
            schema: makeApiResponseSchema(RedemptionSchema),
          },
        },
      },
      400: {
        description: "Error de validación",
        content: {
          "application/json": {
            schema: errorApiSchema,
          },
        },
      },
    },
  },
];
