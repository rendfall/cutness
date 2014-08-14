

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$("#cl-toggle").click(function(e) {
    e.preventDefault();
    $("#rendfall_html").toggleClass("cutting-lines");
});

var app = angular.module('app', ['textAngular']);

app.directive('globalEvents', function() { // directive is places in body
    return function($scope, element, attrs){ // scope is scope, element is directive-source means body, attr are element's attrs
        element.bind('click', function(event){
            var $tar = {};
            $tar.$ = $(event.target);
            $tar.mouseX = event.pageX;
            $tar.mouseY = event.pageY;

            console.log($tar);
        });
    }
});


app.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();
                
                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});




app.controller('Note', function($scope){ // ControllerName: Note
    $scope.items = []; // Scope ng-repeat: item in items
    
    $scope.orightml = '<div style="background-color:red;"><h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn\'t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p></div>';
    $scope.htmlcontent = $scope.orightml;

    $scope.showContent = function($fileContent){
        $scope.htmlcontent = $fileContent;
    };

});
