import pb from "./pocketbase";

async function getImage(id) {
  const record = await pb.collection("Especificaciones").getOne(`${id}`);
  const firstFilename = record.Imagen;
  const url = pb.files.getUrl(record, firstFilename, { thumb: "100x250" });

  return url;
}

export { getImage };