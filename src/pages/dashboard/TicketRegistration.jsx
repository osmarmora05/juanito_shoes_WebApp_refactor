import "../../css/ticketregistration.css";
import ScreenHeader from "../../components/ScreenHeader";
import TextBoxSearch from "../../components/ui/Inputs";
import {
  PrimaryButton,
  RemoveButton,
  SecondaryButton,
} from "../../components/ui/Buttons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import data from "../../mockups/TicketRegistration.json";

// El color no es una dependencia funcional

export default function TicketRegistration() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    if (typeof data !== "undefined" && data && data.length > 0) {
      setRecords(data);
      setFilteredRecords(data);
    }
  }, []);

  const handleRemoveRow = (rowId) => {
    const updatedRecords = filteredRecords.filter((row) => row.id !== rowId);
    setFilteredRecords(updatedRecords);
  };

  const handleChangeRecords = (e) => {
    const filteredRecords = records.filter((record) => {
      return record.Nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFilteredRecords(filteredRecords);
  };

  const COLUMNS = [
    {
      name: "ID",
      selector: (row) => row.id,
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
      wrap: true,
      sortable: true,
    },
    {
      name: "Cantidad",
      cell: (row) => <input type="text" style={{ width: "50px" }} />,
    },
    {
      name: "Acción",
      cell: (row) => (
        <RemoveButton handleOnClick={() => handleRemoveRow(row.id)} />
      ),
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
              handleOnchange={handleChangeRecords}
            />
          </div>

          <PrimaryButton text={"Buscar"} />
        </div>
        {/* Table */}
        <div style={{ width: "100%", height: "300px", overflowY: "auto" }}>
          {records.length == 0 ? (
            <div
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Vaya! Por que intentas buscar en el Catalogo
            </div>
          ) : (
            <DataTable
              columns={COLUMNS}
              data={filteredRecords}
              pagination
              paginationPerPage={4}
              highlightOnHover
            />
          )}
        </div>

        {records.length !== 0 ? (
          <div className="ticketregistration__footer">
            <SecondaryButton text={"Cancelar"} />
            <PrimaryButton text={"Aceptar"} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
