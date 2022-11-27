angular.module('market-front').controller('cartController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://localhost:5555/gateway/api/v1';

    $scope.loadCart = function () {
        $http.post('http://localhost:5555/gateway/api/v1/carts', $localStorage.cartName)
            .then(function (response) {
                $scope.Cart = response.data;
            });
    }

    $scope.removeProduct = function (productId) {
        $http.post('http://localhost:5555/gateway/api/v1/carts/remove/' + productId, $localStorage.cartName)
            .then(function (response) {
                $scope.loadCart();
            });
    }

    $scope.decreaseProduct = function (productId) {
        $http.post('http://localhost:5555/gateway/api/v1/carts/decrease/' + productId, $localStorage.cartName)
            .then(function (response) {
                $scope.loadCart();
            });
    }

    $scope.clearCart = function () {
        $http.post('http://localhost:5555/gateway/api/v1/carts/clear', $localStorage.cartName)
            .then(function (response) {
                $scope.loadCart();
            });
    }

    $scope.checkOut = function () {
        $http({
            url: contextPath + '/orders/' + $localStorage.cartName,
            method: 'POST',
            data: {orderDetailsDto: $scope.orderDetails}
        }).then(function (response) {
            $scope.loadCart();
            $scope.orderDetails = null
        });
    }

    $scope.disabledCheckOut = function () {
        alert("Для оформления заказа необходимо войти в учетную запись");
    }

    $scope.loadCart();
});