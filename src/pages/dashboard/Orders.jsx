import { useState, useEffect } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import TextBoxSearch from "../../components/ui/inputs";
import DataTable from "react-data-table-component";
import { RemoveButton } from "../../components/ui/Buttons";
import AlertDialog from "../../components/ui/AlertDialog";
import RemoveItem from "../../components/ui/RemoveItem";
import "../../css/pedidos.css";
import data from "../../mockups/pedidos.json";

export default function Pedidos() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showRemovePedidosAlertDialog, setShowRemovePedidosAlertDialog] = useState(false);
  const [field, setField] = useState(null);

  const handleChangeRecords = (e) => {
    const filteredRecords = records.filter((record) => {
      return record.Cliente.toLowerCase().includes(
        e.target.value.toLowerCase()
      );
    });

    setFilteredRecords(filteredRecords);
  };

  // Verificamos si existen los datos
  useEffect(() => {
    if (typeof data !== "undefined" && data && data.length > 0) {
      setRecords(data);
      setFilteredRecords(data);
    }
  }, []);

  const COLUMNS = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Numero de factura",
      selector: (row) => row.Numero_factura,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.Cliente,
      sortable: true,
    },
    {
      name: "Nombre de zapato",
      selector: (row) => row.Nombre_zapato,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.Categoría,
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
      name: "Descripción",
      selector: (row) => row.Descripción,
      sortable: true,
      wrap: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.Cantidad,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.Precio,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.Estado,
    },
    {
      name: "Accion",
      cell: (row) => <RemoveButton handleOnClick={()=> {
        setShowRemovePedidosAlertDialog(true)
        setField(row)
      }} />,
    },
  ];

  return (
    <section className="pedidos">
      <ScreenHeader title="Pedidos" description="Vista de pedidos" />
      <div>
        <TextBoxSearch
          title={"Busque pedidos"}
          placeHolder={"Buscar ..."}
          handleOnchange={handleChangeRecords}
        />
      </div>
      <div className="pedidos__table">
        {records.length === 0 ? (
          "Sin valores"
        ) : (
          <DataTable
            columns={COLUMNS}
            data={filteredRecords}
            pagination
            paginationPerPage={6}
            highlightOnHover
          />
        )}
      </div>
      {showRemovePedidosAlertDialog && (
        <AlertDialog content={<RemoveItem row={field}/>} setShowForm={setShowRemovePedidosAlertDialog} />
      )}
    </section>
  );
}
