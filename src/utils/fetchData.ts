export const fetchAlternates = async () => {
  console.log("fetch alts");
  const res = await fetch("/alternates.json");
  const data = await res.json();
  return data;
};

export const fetchProps = async () => {
  console.log("fetch props");
  const res = await fetch("/props.json");
  const data = await res.json();
  return data;
};
