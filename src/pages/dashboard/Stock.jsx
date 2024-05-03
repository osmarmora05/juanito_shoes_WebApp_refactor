import { useState, useEffect } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import TextBoxSearch from "../../components/ui/inputs";
import DataTable from "react-data-table-component";
import { RemoveButton } from "../../components/ui/Buttons";
import AlertDialog from "../../components/ui/AlertDialog";
import RemoveItem from "../../components/ui/RemoveItem";
import "../../css/pedidos.css";
import data from "../../mockups/stock.json";

export default function Stock() {
const [records, setRecords] = useState([]);
const [filteredRecords, setFilteredRecords] = useState([]);
const [showRemovePedidosAlertDialog, setShowRemovePedidosAlertDialog] =
    useState(false);
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
    selector: (row) => row.Categoria,
    sortable: true,
    },
    {
        name: "Precio",
        selector: (row) => row.Precio,
        sortable: true,
    },
    {
    name: "Descripción",
    selector: (row) => row.Descripcion,
    sortable: true,
    wrap: true,
    },
    {
    name: "Tamaño",
    selector: (row) => row.Tamano,
    sortable: true,
    },
    {
    name: "Color",
    selector: (row) => row.Color,
    sortable: true,
    },

    {
    name: "Cantidad",
    selector: (row) => row.Cantidad,
    sortable: true,
    },

];

return (
    <section className="pedidos">
    <ScreenHeader title="Stock" description="Vista de Stock" />
    <div>
        <TextBoxSearch
        title={"Busqueda de Stock"}
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
        <AlertDialog
        content={<RemoveItem row={field} />}
        setShowForm={setShowRemovePedidosAlertDialog}
        />
    )}
    </section>
);
}
