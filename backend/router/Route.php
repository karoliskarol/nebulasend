<?php

namespace Router;

class Route {
    public static function page(string $pg, string $controller) {
        $cPg = str_replace('api', '', strchr($_SERVER['REQUEST_URI'], 'api'));
        $cPg = str_contains($cPg, '?') ? substr($cPg, 0, strpos($cPg, '?')) : $cPg;

        if($pg === $cPg) {
            echo $controller::init();
        }
    }

    public static function get(string $pg, string $controller) {
        if(self::validateMethod('GET')) return self::page($pg, $controller);
    }

    public static function post(string $pg, string $controller) {
        if(self::validateMethod('POST')) return self::page($pg, $controller);
    }

    public static function put(string $pg, string $controller) {
        if(self::validateMethod('PUT')) return self::page($pg, $controller);
    }

    public static function patch(string $pg, string $controller) {
        if(self::validateMethod('PATCH')) return self::page($pg, $controller);
    }

    public static function delete(string $pg, string $controller) {
        if(self::validateMethod('DELETE')) return self::page($pg, $controller);
    }

    private static function validateMethod(string $method) {
        if($_SERVER['REQUEST_METHOD'] === $method) {
            return true;
        }
    }
}


?>