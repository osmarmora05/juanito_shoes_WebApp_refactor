import pb from "./pocketbase";

async function creatTickets(numberOfEntries, id_catalogue, id_worker) {
  try {
    const data = {
      Cantidad_de_entradas: Number(numberOfEntries),
      id_catalogo: id_catalogue,
      id_trabajador: id_worker,
    };

    await pb.collection("Entradas").create(data);
  } catch (e) {
    console.log("there was an error in creatTickets creatTickets " + e);
    throw e;
  }
}

async function getSpecificTickets(id_catalogo) {
  try {
    const result = await pb.collection("Entradas").getFullList({
      filter: `id_catalogo = "${id_catalogo}"`,
    });

    // We check if there is any type of data
    if (!result || result.length == 0) {
      return null;
    }

    return result;
  } catch (e) {
    console.log("there was an error in getSpecificTickets " + e);
    throw e;
  }
}
export { creatTickets, getSpecificTickets };