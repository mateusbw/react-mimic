import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const app = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2>Miners React</h2>
  </div>
)

function createElement(type, props, ...children) {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    },
    ref: null
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function renderElement(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach(child => renderElement(child, dom));
  container.appendChild(dom);
}

const createRoot = (element) => {
  return {
    render: (component) => {
      renderElement(component, element)
    }
  }
}

createRoot(document.getElementById('root')).render(app)
