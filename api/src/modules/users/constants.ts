export const USER_CONSTS = {
  route: 'users',
  services: {
    repository: {
      service: 'USER_REPOSITORY_SERVICE',
      typeorm_db_provider: 'USER_TYPEORM_PROVIDER_KEY',
    },
    useCases: {
      add: 'ADD_USER_USE_CASE_SERVICE',
    },
  },
};
