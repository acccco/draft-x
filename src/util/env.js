let env = 'editor';

const getEnv = () => {
  return env;
};

const toEditor = () => {
  env = 'editor';
};

const toRender = () => {
  env = 'render';
};

export { getEnv, toEditor, toRender };
