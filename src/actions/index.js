export const toggleNightMode = () => ({
  type: 'TOGGLE_NIGHT_MODE'
});

export const setNightMode = nightMode => ({
  type: 'SET_NIGHT_MODE',
  nightMode
});

export const incrementCounter = () => ({
  type: 'INCREMENT_COUNTER'
});

export const decrementCounter = () => ({
  type: 'DECREMENT_COUNTER'
});

export const incrementWorkInterval = () => ({
  type: 'INCREMENT_WORK_INTERVAL'
});

export const decrementWorkInterval = () => ({
  type: 'DECREMENT_WORK_INTERVAL'
});

export const incrementRestInterval = () => ({
  type: 'INCREMENT_REST_INTERVAL'
});

export const decrementRestInterval = () => ({
  type: 'DECREMENT_REST_INTERVAL'
});