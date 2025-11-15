# 🍋 elioDom

elioDom es una pequeña librería DOM minimalista inspirada en jQuery y React, pero sin dependencias, sin magia y con una API moderna.  
Envuelve elementos del DOM en un wrapper que permite encadenar métodos, gestionar eventos, modificar atributos y crear elementos de forma declarativa.

No intenta reemplazar a frameworks. Su objetivo es ofrecer ergonomía al trabajar con HTML nativo y facilitar la escritura de aplicaciones vanilla JS de forma limpia.

## Filosofía

- las operaciones devuelven el wrapper, permitiendo chaining
- los métodos aceptan múltiples formatos de entrada (strings, arrays, múltiples argumentos)
- createElement ofrece una manera declarativa y flexible de crear nodos HTML
- no modifica objetos globales (no usa `$`)
- 100% compatible con ESModules
- pequeño, expresivo y pensado para construir UI dinámica con JavaScript puro

## Instalación

Simplemente importa el módulo donde lo necesites:

```js
import { elio } from "./lib/elioDom.js";
```

## Uso básico

Seleccionar elementos:

```js
const box = elio("#box");
box.addClass("active");
```

Seleccionar múltiples:

```js
elio(".item").addClass("highlight");
```

Obtener el elemento HTML subyacente:

```js
const el = elio("#btn").get();
```

# API del wrapper

Todos los métodos devuelven el wrapper, salvo que se indique lo contrario.

### elio(selector)
Crea un wrapper a partir de un selector CSS, un HTMLElement o un array de elementos.

```js
const btn = elio("#btn");
const boxes = elio(document.querySelectorAll(".box"));
const fromArray = elio([el1, el2]);
```

## Métodos de manejo de clases

### addClass(...args)
Acepta strings, arrays o múltiples argumentos.

### removeClass(...args)

## Métodos de atributos

### set(attrName, value)

### setAttributes(attrsObject)

## Contenido

### html(content?)
### text(content?)
### append(node | string | wrapper)
### clear()

## Eventos

### on(eventName, handler)
### onClick(handler)
### onChange(handler)
### onInput(handler)
### onSubmit(handler)
### onLoad(handler)

## Estilos

### css(stylesObject)

## Visibilidad

### hide()
### show(displayValue = "")
### toggle(displayValue = "")

## Acceso

### get(index = 0)

# Métodos estáticos

## elio.createElement(type, options)
## elio.makeDOM(map)

# Casos avanzados

documentación técnica avanzada...

# Licencia

Este módulo es libre. Puedes copiarlo, modificarlo y adaptarlo a tus proyectos sin restricciones.
