const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
};

const createTextElement = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      text,
      children: [],
    },
  };
};

const createDomNode = (reactElement) => {
  const domNode =
    reactElement.type === "TEXT_ELEMENT"
      ? document.createTextNode(reactElement.props.text)
      : document.createElement(reactElement.type);

  Object.entries(reactElement.props).forEach(([propName, propValue]) => {
    if (reactElement.type === "TEXT_ELEMENT") return;

    if (propName !== "children") {
      domNode.setAttribute(propName, propValue);
    }
  });

  return domNode;
};

const performUnitOfWork = (fiber) => { //Pokedex
    if(!fiber.dom){
        fiber.dom = createDomNode(fiber)
    }

    if(fiber.parent){ //root
        fiber.parent.dom.appendChild(fiber.dom);
    }

    const childrenElements = fiber.props.children;
    let prevsSibling = null;

    childrenElements.forEach((child, index) => {
        const fiberChild = {
            type: child.type,
            props: child.props,
            parent: fiber,
            dom: null,
        }

        if(index === 0) {
            fiber.child = fiberChild;
        }else{
            prevsSibling.sibling = fiberChild;
        }

        prevsSibling = fiberChild;
    })

    if(fiber.child){ //Null
        return fiber.child
    }

    let nextFiber = fiber; //H1

    while(nextFiber){ //H1
        if(nextFiber.sibling){ //UL
            return nextFiber.sibling
        }

        nextFiber =  nextFiber.parent
    }
};

let nextUnitOfWork = null;

const createRoot = (container) => {
  return {
    render: (element) => {
      nextUnitOfWork = {
        dom: container,
        props: {
          children: [element],
        },
      };

      while (nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    },
  };
};

//Fiber Tree
// Type, Props, DOM, Parent, Child, Sibling

export default {
  createElement,
  createRoot,
};
