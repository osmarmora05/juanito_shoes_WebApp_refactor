import "../../css/ticketregistration.css";
import ScreenHeader from "../../components/ScreenHeader";
import TextBoxSearch from "../../components/ui/inputs";
import {
  PrimaryButton,
  RemoveButton,
  SecondaryButton,
} from "../../components/ui/Buttons";
import { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import {
  getSpecificShoeWithSpecifications,
  getImage,
  creatTickets,
} from "../../services/db";
import { Toaster, toast } from "sonner";
import { useAuthContenxt } from "../../context/ContextAuthenticatedUser";

export default function TicketRegistration() {
  const [searchBox, showSearchBox] = useState(false); // Search result drawer lever (where the table is)
  const [searchText, setSearchText] = useState(""); // Handles text input text
  const poppupSearchBox = useRef(); // Search result reference drawer lever (where the table is)
  const { user } = useAuthContenxt(); // We obtain the worker's credentials
  const [catalogRecords, setCatalogRecords] = useState([]); // Manages the result of the catalog table (db)
  const [merchandiseRegistration, setMerchandiseRegistration] = useState([]); // Handles data entry into the entry table

  // Deletes a row from the input table (at runtime)
  const handleRemoveRow = (rowId) => {
    const updatedRecords = merchandiseRegistration.filter(
      (row) => row.id !== rowId
    );
    setMerchandiseRegistration(updatedRecords);
  };

  // Get row values from catalog table
  const handleRowClicked = (row) => {
    showSearchBox(false);
    if (!merchandiseRegistration.find((item) => item.id === row.id)) {
      setMerchandiseRegistration([
        ...merchandiseRegistration,
        { ...row, Cantidad: 1 },
      ]);
    }
  };

  // Get the values of the quantity input from the table
  const handleQuantityChange = (id, value) => {
    setMerchandiseRegistration(
      merchandiseRegistration.map((item) => {
        if (item.id === id) {
          return { ...item, Cantidad: value };
        }
        return item;
      })
    );
  };

  // Search catalog table record
  async function onSearch() {
    const result = await getSpecificShoeWithSpecifications(searchText);
    console.log(result);
    if (result == null) {
      toast.warning("Oye! Parace que no hay un registro", {
        description:
          "Por que no intentas nuevamente o contactas con soporte tecnico",
      });
    } else {
      const promises = result.map(async (item) => ({
        id: item.id,
        Nombre: item.Nombre,
        Modelo: item.expand.id_especificaciones.Modelo,
        Marca: item.expand.id_especificaciones.Marca,
        Categoria:
          item.expand.id_especificaciones.expand.id_categoria.Categoria,
        Precio: item.Precio,
        Descripcion: item.Descripcion,
        Tamano: item.expand.id_especificaciones.Tamano,
        Color: item.expand.id_especificaciones.Color,
        Imagen: await getImage(item.id_especificaciones),
      }));

      const newRecords = await Promise.all(promises);
      console.log(newRecords);
      setCatalogRecords(newRecords);
      console.log(catalogRecords);
    }
  }

  // Enter the table information in the database
  async function onAccept() {
    merchandiseRegistration.map((item) => {
      creatTickets(Number(item.Cantidad), item.id, user.id);
    });

    toast.success("Solicitud aceptada");
    setMerchandiseRegistration([]);
  }

  useEffect(() => {
    console.log("Catalog Records:", catalogRecords);

    if (catalogRecords.length != 0) {
      showSearchBox(true);
    }

    const handleClick = (e) => {
      if (
        !poppupSearchBox.current ||
        !poppupSearchBox.current.contains(e.target)
      ) {
        showSearchBox(false);
      }
    };

    const closeForm = (e) => {
      if (e.key === "Escape") {
        showSearchBox(false);
      }
    };

    document.body.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", closeForm);

    return () => {
      document.body.addEventListener("mousedown", handleClick);
      document.body.removeEventListener("keydown", closeForm);
    };
  }, [catalogRecords]);

  const CATALOGCOLUMN = [
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
      name: "Descripción",
      selector: (row) => row.Descripcion,
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
      selector: (row) => row.Tamano,
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
  ];

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
      name: "Descripción",
      selector: (row) => row.Descripcion,
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
      selector: (row) => row.Tamano,
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
      cell: (row) => (
        <input
          type="text"
          style={{ width: "50px" }}
          value={row.Cantidad}
          onChange={(e) => handleQuantityChange(row.id, e.target.value)}
        />
      ),
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
              name={"nombre"}
              handleOnchange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>

          <PrimaryButton
            text={"Buscar"}
            handleOnClick={async () => {
              await onSearch();
            }}
          />

          {searchBox && (
            <div
              style={{
                position: "absolute",
                width: "65%",
                height: "200px",
                top: "68px",
                zIndex: "1",
                overflowY: "auto",
                overflowX: "auto",
                border: "2px solid #E6EBF1",
              }}
              ref={poppupSearchBox}
            >
              <DataTable
                columns={CATALOGCOLUMN}
                data={catalogRecords}
                pagination
                paginationPerPage={4}
                highlightOnHover
                onRowClicked={handleRowClicked}
              />
            </div>
          )}
        </div>
        {/* Table */}
        <div style={{ width: "100%", height: "300px", overflowY: "auto" }}>
          {merchandiseRegistration.length == 0 ? (
            <div
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Vaya! Por que no intentas buscar en el Catalogo
            </div>
          ) : (
            <DataTable
              columns={COLUMNS}
              data={merchandiseRegistration}
              pagination
              paginationPerPage={4}
              highlightOnHover
            />
          )}
        </div>

        {merchandiseRegistration.length !== 0 ? (
          <div className="ticketregistration__footer">
            <SecondaryButton
              text={"Cancelar"}
              handleOnClick={() => {
                setMerchandiseRegistration([]);
              }}
            />
            <PrimaryButton
              text={"Aceptar"}
              handleOnClick={() => {
                onAccept();
              }}
            />
          </div>
        ) : null}
      </div>
      <Toaster />
    </section>
  );
}