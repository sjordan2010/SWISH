export const fetchAlternates = async () => {
  const res = await fetch("/alternates.json");
  const data = await res.json();
//   console.log("keys", Object.keys(data[0]))
  return data;
};

export const fetchProps = async () => {
  const res = await fetch("/props.json");
  const data = await res.json();
  return data;
};