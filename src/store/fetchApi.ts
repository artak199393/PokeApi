export async function fetchDataFromAPI(
  fetchOffset: number,
  pokeAllCount: number
) {
  console.log(pokeAllCount, 'pokeAllCount');
  if (fetchOffset <= pokeAllCount) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${fetchOffset}&limit=20`
    );
    if (response) {
      return response.json();
    }
  }
  return null;
}

export async function getModalImg(url: string) {
  const response = await fetch(url);
  return response.json();
}

export async function getCardsImg(url: string) {
  const response = await fetch(url);
  return response.json();
}

export async function getTypesMenu(url: string) {
  const response = await fetch(url);
  return response.json();
}

export async function getSpecifyType(url: string) {
  const response = await fetch(url);
  return response.json();
}
