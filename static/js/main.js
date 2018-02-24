var app = angular.module('tuto', []);

//service
app.factory('TutoService', ['$http', '$window', tutoService]);

function tutoService($http, $window) {
    var service = {
        loadFromLocalStorage: loadFromLocalStorage,
        saveToLocalStorage: saveToLocalStorage
    };

    return service;

    function loadFromLocalStorage() {
        var json = $window.localStorage.getItem("todos");
        return angular.fromJson(json) || [];
    };

    function saveToLocalStorage(todos) {
        $window.localStorage.setItem("todos", angular.toJson(todos));
        return loadFromLocalStorage();
    };

}

//controller
app.controller('MainController', ['TutoService', mainController]);

function mainController(TutoService) {
    var vm = this;

    vm.title = "TODO app";

    vm.todos = TutoService.loadFromLocalStorage();
    vm.showDoneTodos = true;

    vm.save = save;
    vm.todoChanged = todoChanged;
    vm.deleteTodo = deleteTodo;

    /*init();

    function init() {
        $('#todoLabel').focus();
    }*/

    function save() {
        if (vm.todoLabel && vm.todoLabel !== '') {
            vm.todos.push({id: Date.now(), label: vm.todoLabel, done: false});
            vm.todos = TutoService.saveToLocalStorage(vm.todos);
            vm.todoLabel = '';
            $('#todoLabel').focus();
        }
    }

    function todoChanged() {
        vm.todos = TutoService.saveToLocalStorage(vm.todos);
    }

    function deleteTodo(event, id) {
        event.preventDefault();
        var indexToRemove = vm.todos.findIndex(function (element) {
            return element.id === id;
        });
        vm.todos.splice(indexToRemove, 1);
        vm.todos = TutoService.saveToLocalStorage(vm.todos);
        return false;
    };

}