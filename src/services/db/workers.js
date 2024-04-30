import pb from "./pocketbase";

async function getWorkers() {
  try {
    const result = await pb.collection("Trabajadores").getFullList();

    // We check if there is any type of data
    if (!result && result.length == 0) {
      return null;
    }

    return result;
  } catch (e) {
    console.log("there was an error in getWorkers " + e);
  }
}

async function getSpecificUser(email, password) {
  try {
    const result = await pb.collection("Trabajadores").getFullList({
      filter: `Correo = "${email}" && Contrasena = "${password}"`,
    });

    // We check if there is any type of data
    if (!result || result.length==0) {
      return null;
    }

    return result;
  } catch (e) {
    console.log("there was an error in getSpecificUser " + e);
  }

  // console.log("estamos en getSpecificUser")

  // const result = await pb.collection("Trabajadores").getFullList({
  //   filter: `Correo = "${email}" && Contrasena = "${password}"`,
  // });

  // return result
}

export { getWorkers, getSpecificUser };
