function Choice(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

export { Choice };
