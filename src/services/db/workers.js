import pb from "./pocketbase";

async function getWorkers() {
  try {
    const result = await pb.collection("Trabajadores").getFullList();

    // We check if there is any type of data
    if (!result && result.length == 0) {
      return null;
    }

    return result;
  } catch (e) {}
}

async function getSpecificUser(email) {
  const result = await pb.collection("Trabajadores").getFullList({
    filter: `Correo = "${email}"`,
  });

  if (!result && result.length == 0) {
    return null;
  }
}

export { getWorkers, getSpecificUser };