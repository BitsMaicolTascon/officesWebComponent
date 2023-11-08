import { when } from 'lit/directives/when.js';

const handleTemplate = (show, template, optional = null) => {
  return when(
    show,
    () => template,
    () => optional
  );
};

export default handleTemplate;
