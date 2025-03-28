export const PROVIDER_KEYS = {
  USER: {
    SERVICES: {
      REPO: {
        SERVICE: 'USER_REPOSITORY_SERVICE',
        DB_USER_INSTANCE: 'USER_REPOSITORY_TYPEORM_DB_INSTANCE',
      },
      USECASES: {
        ADD: 'ADD_USER_USE_CASE_SERVICE',
        UPDATE_BY_ID: 'UPDATE_USER_BY_ID_USE_CASE_SERVICE',
        LOAD: 'LOAD_USERS_USE_CASE_SERVICE',
        DELETE_BY_ID: 'DELETE_USER_BY_ID_USE_CASE_SERVICE',
      },
    },
  },
  CRYPT: {
    SERVICE: 'CRYPT_SERVICE',
  },
  CASL: {
    SERVICE: 'CASL_ABILITY_SERVICE',
  },
  TYPE_ORM: {
    SERVICE: 'TYPEORM_DB_INSTANCE',
  },
};
