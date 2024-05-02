import pb from "./pocketbase";

async function getSpecificShoeWithSpecifications(name) {
  try {
    const result = await pb.collection("Catalogo").getFullList({
      filter: `Nombre = "${name}"`,
      expand: "id_especificaciones.id_categoria",
    });

    // We check if there is any type of data
    if (!result || result.length == 0) {
      return null;
    }

    return result;
  } catch (e) {
    console.log("there was an error in getSpecificShoe " + e);
    throw e;
  }
}

export { getSpecificShoeWithSpecifications };
