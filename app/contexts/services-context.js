import React from 'react';

const ServicesContext = React.createContext();

export function withServices(Component) {
  // ...and returns another component...
  return function ServicesComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <ServicesContext.Consumer>
        {services => (<Component
          {...props}
          services={services}
        />)}
      </ServicesContext.Consumer>
    );
  };
}

export default ServicesContext;

