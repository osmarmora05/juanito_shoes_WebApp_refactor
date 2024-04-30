import "../../css/ticketregistration.css";
import ScreenHeader from "../../components/ScreenHeader";
import TextBoxSearch from "../../components/ui/Inputs";
import { PrimaryButton, RemoveButton } from "../../components/ui/Buttons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

export default function TicketRegistration() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    if (typeof data !== "undefined" && data && data.length > 0) {
      setRecords(data);
      setFilteredRecords(data);
    }
  }, []);

  const COLUMNS = [
    {
      name: "ID",
      selector: (row) => row.Id,
      sortable: true,
    },

    {
      name: "Nombre",
      selector: (row) => row.Nombre,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.Modelo,
      sortable: true,
    },
    {
      name: "Marca",
      selector: (row) => row.Marca,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.Modelo,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.Categoría,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.Descripción,
      wrap: true,
      sortable: true,
    },
    {
      name: "Precio Unitario",
      selector: (row) => row.Precio,
      sortable: true,
    },
    {
      name: "Tamaño",
      selector: (row) => row.Tamaño,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.Color,
      sortable: true,
    },
    {
      name: "Imagen",
      selector: (row) => row.Imagen,
      sortable: true,
    },
    {
      name: "Cantidad",
      cell: (row) => <input type="text" />,
    },
    {
      name: "Acción",
      cell: (row) => <RemoveButton />,
    },
  ];

  return (
    <section className="ticketregistration">
      <ScreenHeader
        title="Registro de entradas"
        description="Ingreso de entrada de mercaderia"
      />

      <div className="ticketregistration__box">
        {/* Input */}
        <div className="ticketregistration__box-input">
          <div>
            <TextBoxSearch
              placeHolder={"Escriba el nombre"}
              title={"Busque en el catalogo"}
            />
          </div>

          <PrimaryButton text={"Buscar"} />
        </div>
        {/* Table */}
        <div style={{ width: "100%", height: "300px", overflowY: "auto" }}></div>
      </div>
    </section>
  );
}
