# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



### Example3-1
- Uses React context
- The provider value is empty and the same object
- The children also render
    1. They don't care about context
    2. They don't have state derived/computed from context as props
    3. Actually they don't have any changing props
- https://stackoverflow.com/questions/73599444/reacts-context-api-re-renders-all-components-that-are-wrapped-inside-the-contex