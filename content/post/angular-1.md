+++
date = "2017-03-30T21:48:42+02:00"
title = "Angular 1"
tags = []
math = false
image = ""
summary = """
Exemple simple d'une appli Angular
"""

+++

<link rel="stylesheet" href="/css/custom.css">

Petit tutorial sur Angular 1 avec une démo à la fin :)

Fichier index html **index.html**
```html
<!doctype html>
<html class="no-js" lang="" ng-app="tuto">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <style>
        body {
            padding-top: 50px;
            padding-bottom: 20px;
        }
    </style>
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="css/main.css">

    <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

</head>
<body ng-controller="MainController as vm">

<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#" ng-bind="vm.title"></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
        </div>
    </div>
</nav>

<div class="container">

    <hr>

    <div class="row">
        <div class="col-md-4">
            <form id="searchForm" ng-submit="vm.save()">
                <input type="text" ng-model="vm.todoLabel" id="todoLabel">
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>

    <hr>

    <table class="table table-striped">
        <thead>
        <tr>
            <th>Done</th>
            <th>Tâche</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tr ng-repeat="todo in vm.todos" ng-show="(todo.done === false) || (todo.done === true && vm.showDoneTodos === true)">
            <td><input type="checkbox" ng-model="todo.done" ng-change="vm.todoChanged()" id="cb{{todo.id}}"></td>
            <td><label ng-bind="todo.label" ng-class="{barre: todo.done}" for="cb{{todo.id}}"></label></td>
            <td><a href="#" ng-click="vm.deleteTodo(todo.id)"><span class="glyphicon glyphicon-trash btn btn-danger"></span></a></td>
        </tr>
    </table>


</div>

<script src="js/vendor/jquery-1.11.2.min.js"></script>

<script src="js/vendor/bootstrap.min.js"></script>

<script src="js/vendor/angular/1.6.3/angular.min.js"></script>

<script src="js/main.js"></script>
<script src="js/tutoService.js"></script>
<script src="js/tutoController.js"></script>

</body>
</html>


```

Main module javascript file **main.js**
```javascript
var app = angular.module('tuto', []);
```

Controller javascript file **tutoController.js**
```javascript
app.controller('MainController', ['TutoService', mainController]);

function mainController(TutoService) {
    var vm = this;

    vm.title = "Hello World !";

    vm.todos = TutoService.loadFromLocalStorage();
    vm.showDoneTodos = true;

    vm.save = save;
    vm.todoChanged = todoChanged;
    vm.deleteTodo = deleteTodo;

    init();

    function init() {
        $('#todoLabel').focus();
    }

    function save() {
        if (vm.todoLabel !== '') {
            vm.todos.push({id: findNextId(), label: vm.todoLabel, done: false});
            vm.todos = TutoService.saveToLocalStorage(vm.todos);
            vm.todoLabel = '';
            $('#todoLabel').focus();
        }
    }

    function findNextId() {
        var maxId = 1;
        vm.todos.forEach(function (element) {
            if (element.id === maxId) {
                maxId = element.id + 1;
            }
        });
        return maxId;
    }

    function todoChanged() {
        vm.todos = TutoService.saveToLocalStorage(vm.todos);
    }

    function deleteTodo(id) {
        var indexToRemove = vm.todos.findIndex(function (element) {
            return element.id === id;
        });
        vm.todos.splice(indexToRemove, 1);
        vm.todos = TutoService.saveToLocalStorage(vm.todos);
    };

}
```

Service javascript file **tutoService.js**
```javascript
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
```

# Démo
<div ng-app="tuto">
    <div ng-controller="MainController as vm">

        <hr>

        <form id="searchForm" ng-submit="vm.save()">
            <input type="text" ng-model="vm.todoLabel" id="todoLabel" placeholder="saisir une tâche à faire">
            <button type="submit" class="btn btn-primary">Enregistrer</button>
        </form>

        <hr>

        <table class="table table-striped">
            <thead>
            <tr>
                <th>Fait</th>
                <th>Tâche</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tr ng-repeat="todo in vm.todos" ng-show="(todo.done === false) || (todo.done === true && vm.showDoneTodos === true)">
                <td><input type="checkbox" ng-model="todo.done" ng-change="vm.todoChanged()" id="cb{{todo.id}}"></td>
                <td><label ng-bind="todo.label" ng-class="{barre: todo.done}" for="cb{{todo.id}}"></label></td>
                <td><a href="#" ng-click="vm.deleteTodo($event, todo.id)"><span class="glyphicon glyphicon-trash btn btn-danger"></span></a></td>
            </tr>
        </table>

        <hr>

    </div>
</div>

<script src="/js/angular.min.js"></script>
<script src="/js/main.js"></script>