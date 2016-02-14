import { HttpInterceptor } from '../common/HttpInterceptorBase'

export class AuthInterceptor extends HttpInterceptor {
  constructor($q, $injector, $location, localStorageService) {
    //noinspection BadExpressionStatementJS
    'ngInject';
    super();

    this.$q = $q;
    this.$injector = $injector;
    this.$location = $location;
    this.localStorageService = localStorageService;
    this.$injector = $injector;

  }

  request(config) {
    config.headers = config.headers || {};
    var authService = this.$injector.get('authService');
    var user = authService.getCurrentUser();
    if(user) {
      config.headers.Authorization = 'Bearer ' + user.token;
    }

    return config;
  }

  responseError(rejection) {
    if(rejection.status == 401) {
      var authService = this.$injector.get('authService');
      authService.logOut();
      this.$location.path('/login');
    }

    return this.$q.reject(rejection);
  }
}
