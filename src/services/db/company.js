import pb from "./pocketbase";

async function creatCompany(
  name,
  rucNumber,
  phoneNumber,
  address,
  logo,
  state
) {
  try {
    const data = {
      Nombre: name,
      Numero_ruc: rucNumber,
      Numero_de_telefono: phoneNumber,
      Direccion: address,
      Logo: logo,
      Estado: state,
    };

    await pb.collection("Empresa").create(data);
  } catch (e) {
    console.log("there was an error in creatTickets creatCompany " + e);
    throw e;
  }
}

async function getCompany() {
  try {
    const result = await pb.collection("Empresa").getFullList();

    if (!result || result.length == 0) {
      return null;
    }

    return result;
  } catch (e) {
    console.log("there was an error in creatTickets getCompany " + e);
    throw e;
  }
}

export { creatCompany, getCompany };
