// https://github.com/encarbassot/elioDom

/*
           /$$ /$$                 /$$$$$$$   /$$$$$$  /$$      /$$
          | $$|__/                | $$__  $$ /$$__  $$| $$$    /$$$
  /$$$$$$ | $$ /$$  /$$$$$$       | $$  \ $$| $$  \ $$| $$$$  /$$$$
 /$$__  $$| $$| $$ /$$__  $$      | $$  | $$| $$  | $$| $$ $$/$$ $$
| $$$$$$$$| $$| $$| $$  \ $$      | $$  | $$| $$  | $$| $$  $$$| $$
| $$_____/| $$| $$| $$  | $$      | $$  | $$| $$  | $$| $$\  $ | $$
|  $$$$$$$| $$| $$|  $$$$$$/      | $$$$$$$/|  $$$$$$/| $$ \/  | $$
 \_______/|__/|__/ \______/       |_______/  \______/ |__/     |__/
*/
export function elio(target) {
  const elements =
    typeof target === "string"
      ? Array.from(document.querySelectorAll(target))
      : target instanceof HTMLElement
      ? [target]
      : Array.isArray(target)
      ? target
      : [];

  const api = {
    elements,


    // --------------- ATTRIBUTES ----------------

    addClass(...args) {
      const classes = normalizeStringList(...args);
      if (!classes.length) return api;
    
      elements.forEach((el) => {
        el.classList.add(...classes);
      });
    
      return api;
    },
    
    removeClass(...args) {
      const classes = normalizeStringList(...args);
      if (!classes.length) return api;
    
      elements.forEach((el) => {
        el.classList.remove(...classes);
      });
    
      return api;
    },
    

    set(attrName, value) {
      const attr = attrName;

      if (attrName === "class" || attrName === "className" || attrName === "classList") {
        // si es null/undefined/"" → limpiamos clases
        if (value === null || value === undefined || value === "") {
          elements.forEach((el) => {el.className = "";});
          return api;
        }

        // en cualquier otro caso, delegamos en addClass
        api.addClass(value);
        return api;
      }

      elements.forEach((el) => {
        if (value === null || value === undefined) {
          el.removeAttribute(attr);
          if (attr in el) {
            try {
              el[attr] = "";
            } catch {
              // ignoramos si no se puede asignar
            }
          }
        } else {
          if (attr in el) {
            try {
              el[attr] = value;
            } catch {
              el.setAttribute(attr, value);
            }
          } else {
            el.setAttribute(attr, value);
          }
        }
      });
    
    
      return api;
    },
    
    setAttributes(attrs = {}) {
      Object.entries(attrs).forEach(([key, value]) => {
        api.set(key, value);
      });
      return api;
    },
    
    // --------------- ATTRIBUTES ----------------


    // --------------- EVENTS ----------------

    on(event, handler) {
      elements.forEach((el) => el.addEventListener(event, handler));
      return api;
    },

    // azúcar estilo React: onClick, onChange, etc.
    onClick(handler) {
      return api.on("click", handler);
    },

    onChange(handler) {
      return api.on("change", handler);
    },

    onInput(handler) {
      return api.on("input", handler);
    },

    onSubmit(handler) {
      return api.on("submit", handler);
    },

    onLoad(handler) {
      return api.on("load", handler);
    },

    // --------------- EVENTS ----------------

    html(content) {
      if (content === undefined) return elements[0]?.innerHTML;
      elements.forEach((el) => (el.innerHTML = content));
      return api;
    },

    text(content) {
      if (content === undefined) return elements[0]?.textContent;
      elements.forEach((el) => (el.textContent = content));
      return api;
    },

    append(content) {
      elements.forEach((el) => {
        if (!content) return;

        // DocumentFragment o cualquier Node
        if (content instanceof Node) {
          el.appendChild(content);
        } else if (content instanceof HTMLElement) {
          el.appendChild(content);
        } else if (typeof content === "string" || typeof content === "number") {
          el.appendChild(document.createTextNode(String(content)));
        } else if (content?.elements) {
          content.elements.forEach((child) => el.appendChild(child));
        }
      });
      return api;
    },


    // --------------- MODIFY element ----------------
    hide() {
      elements.forEach((el) => (el.style.display = "none"));
      return api;
    },

    show(displayValue = "") {
      elements.forEach((el) => (el.style.display = displayValue));
      return api;
    },

    toggle(displayValue = "") {
      elements.forEach((el) => {
        el.style.display =
          el.style.display === "none" || getComputedStyle(el).display === "none"
            ? displayValue
            : "none";
      });
      return api;
    },



    clear() {
      elements.forEach((el) => {
        el.innerHTML = "";
      });
      return api;
    },





    css(styles) {
      if (!styles) return elements[0] ? getComputedStyle(elements[0]) : null;
      elements.forEach((el) => Object.assign(el.style, styles));
      return api;
    },

    get(index = 0) {
      return elements[index];
    },
  };

  return api;

}

































/*
                                           /$$                     /$$$$$$$$ /$$                                               /$$    
                                          | $$                    | $$_____/| $$                                              | $$    
  /$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$    /$$$$$$       | $$      | $$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$$  /$$$$$$  
 /$$_____/ /$$__  $$ /$$__  $$ |____  $$|_  $$_/   /$$__  $$      | $$$$$   | $$ /$$__  $$| $$_  $$_  $$ /$$__  $$| $$__  $$|_  $$_/  
| $$      | $$  \__/| $$$$$$$$  /$$$$$$$  | $$    | $$$$$$$$      | $$__/   | $$| $$$$$$$$| $$ \ $$ \ $$| $$$$$$$$| $$  \ $$  | $$    
| $$      | $$      | $$_____/ /$$__  $$  | $$ /$$| $$_____/      | $$      | $$| $$_____/| $$ | $$ | $$| $$_____/| $$  | $$  | $$ /$$
|  $$$$$$$| $$      |  $$$$$$$|  $$$$$$$  |  $$$$/|  $$$$$$$      | $$$$$$$$| $$|  $$$$$$$| $$ | $$ | $$|  $$$$$$$| $$  | $$  |  $$$$/
 \_______/|__/       \_______/ \_______/   \___/   \_______/      |________/|__/ \_______/|__/ |__/ |__/ \_______/|__/  |__/   \___/  
*/



elio.create = function (
  type,
  { 
    content = null,
    attributes = null,
    events = null,
    parent = null,
    ...restProps 
  } = {}
) {
  const el = document.createElement(type);


  const topLevelClasses = normalizeStringList(
    restProps.class,
    restProps.className,
    restProps.classList
  );

  if (topLevelClasses.length) {
    el.classList.add(...topLevelClasses);
  }


  // --- CONTENIDO ---
  const addContent = (item) => {
    if (!item) return;

    if (Array.isArray(item)) {
      item.forEach(addContent);
    } else if (item instanceof HTMLElement) {
      el.appendChild(item);
    } else if (typeof item === "string" || typeof item === "number") {
      el.appendChild(document.createTextNode(String(item)));
    } else if (typeof item === "function") {
      item(el);
    } else if (item?.elements) {
      item.elements.forEach((child) => el.appendChild(child));
    }
  };

  addContent(content);

  // --- ATRIBUTOS ---
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "class" || key === "className" || key === "classList") {
        const classes = normalizeStringList(value);
        if (classes.length) {
          el.classList.add(...classes);
        }
      } else if (key === "style" && typeof value === "object") {
        Object.assign(el.style, value);
      } else if (key in el) {
        el[key] = value;
      } else {
        el.setAttribute(key, value);
      }
    });
  }

  // --- EVENTOS ---
  if (events) {
    Object.entries(events).forEach(([name, handler]) =>
      el.addEventListener(name, handler)
    );
  }

  // --- PARENT ---
  if (parent) {
    if (parent instanceof HTMLElement) parent.appendChild(el);
    else if (typeof parent === "string") {
      const p = document.querySelector(parent);
      if (p) p.appendChild(el);
    } else if (parent?.elements) {
      parent.elements[0]?.appendChild(el);
    }
  }

  // return wrapper
  return elio(el);
};

































/*
                         /$$                       /$$$$$$$   /$$$$$$  /$$      /$$
                        | $$                      | $$__  $$ /$$__  $$| $$$    /$$$
 /$$$$$$/$$$$   /$$$$$$ | $$   /$$  /$$$$$$       | $$  \ $$| $$  \ $$| $$$$  /$$$$
| $$_  $$_  $$ |____  $$| $$  /$$/ /$$__  $$      | $$  | $$| $$  | $$| $$ $$/$$ $$
| $$ \ $$ \ $$  /$$$$$$$| $$$$$$/ | $$$$$$$$      | $$  | $$| $$  | $$| $$  $$$| $$
| $$ | $$ | $$ /$$__  $$| $$_  $$ | $$_____/      | $$  | $$| $$  | $$| $$\  $ | $$
| $$ | $$ | $$|  $$$$$$$| $$ \  $$|  $$$$$$$      | $$$$$$$/|  $$$$$$/| $$ \/  | $$
|__/ |__/ |__/ \_______/|__/  \__/ \_______/      |_______/  \______/ |__/     |__/                                                                                 
*/



elio.makeDOM = function (queries) {
  const mapQueries = (obj) => {
    const result = {};
    for (const key in obj) {
      const val = obj[key];
      if (typeof val === "string") {
        result[key] = elio(val); // wrapper
      } else if (val && typeof val === "object" && !Array.isArray(val)) {
        result[key] = mapQueries(val); // anidado
      }
    }
    return result;
  };

  if (Array.isArray(queries)) {
    const result = {};
    queries.forEach((q) => {
      const name = q.split(/[#.]/).filter(Boolean).join("");
      result[name] = elio(q);
    });
    return result;
  } else if (queries && typeof queries === "object") {
    return mapQueries(queries);
  }

  return {};
};


























/*
 /$$   /$$ /$$$$$$$$ /$$$$$$ /$$        /$$$$$$ 
| $$  | $$|__  $$__/|_  $$_/| $$       /$$__  $$
| $$  | $$   | $$     | $$  | $$      | $$  \__/
| $$  | $$   | $$     | $$  | $$      |  $$$$$$ 
| $$  | $$   | $$     | $$  | $$       \____  $$
| $$  | $$   | $$     | $$  | $$       /$$  \ $$
|  $$$$$$/   | $$    /$$$$$$| $$$$$$$$|  $$$$$$/
 \______/    |__/   |______/|________/ \______/ 
*/


/*
el.addClass("btn primary");
el.addClass(["btn", "primary"]);
el.addClass("btn", "primary", ["big", "rounded"]);

returns array of normalized class names
*/
function normalizeStringList(...args) {
  const result = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (Array.isArray(arg)) {
      arg.forEach((item) => {
        if (typeof item === "string") {
          result.push(
            ...item
              .split(/\s+/)
              .map((c) => c.trim())
              .filter(Boolean)
          );
        }
      });
    } else if (typeof arg === "string") {
      result.push(
        ...arg
          .split(/\s+/)
          .map((c) => c.trim())
          .filter(Boolean)
      );
    }
  });

  // opcional: evitar duplicados
  return [...new Set(result)];
}
