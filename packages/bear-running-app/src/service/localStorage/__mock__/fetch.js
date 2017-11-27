const create = () => {
  let memory = {};

  return {
    reset: () => (memory = {}),
    write: (key, value) => (memory[key] = value),
    read: key => memory[key]
  };
};

const u = create();

export default create();
