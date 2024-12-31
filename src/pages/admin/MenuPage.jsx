import React, { useState, useContext } from "react";
import TableLayout from "../../components/layout/TableLayout";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";

import LineTable from "../../featuresV/menus/LineTable";
import { deleteApi } from "../../api/apiFactory";
import toast from "react-hot-toast";

import ModalDelete from "../../components/common/modal/ModalDelete";
import { ModalContext } from "../../contexts/ModalContext";
import Empty from "../../components/common/all/Empty";
import MenuDetails from "../../featuresV/menus/MenuDetails";
import MenuForm from "../../featuresV/menus/MenuForm";
import MenuFormUpdate from "../../featuresV/menus/MenuFormUpdate";
function MenuPage() {
  const { handleModal } = useContext(ModalContext);
  const [menu, setMenu] = useState(null);
  const {
    data: menus,
    selectPage,
    refetch,
  } = usePaginatedData(8, "/menu/all", "menus");

  console.log(menus);

  const updateMenuFun = (menu) => {
    setMenu(menu);
  };
  const deleteMenuFun = async (id) => {
    deleteApi("/menu/", id, {
      token: true,
      formData: false,
    })
      .then((res) => {
        toast.success("Successfully deleted!");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };
  return (
    <div className="flex  gap-6   ">
      <div className="w-1/2 order-1 ">
        <div className="w-full h-20 text-white font-semibold bg-red-400 shadow-lg mb-4 flex justify-center items-center rounded-md text-3xl">
          Daily Menu{" "}
        </div>
        <div className=" bg-primary   p-8 pb-0 shadow-lg rounded-lg  border-t-4 border-b-4 border-red-400">
          <p className="text-gray-500 capitalize -mt-4 text-end">
            {" "}
            total menus : {menus?.data.totalElements}
          </p>
          {menus && menus.data.length == 0 ? (
            <Empty />
          ) : (
            <TableLayout
              withPaginate={true}
              columns={["name", "prix", "cout", "date de creation", "action"]}
              selectPage={selectPage}
              nbPages={menus?.data.totalPages}>
              {menus &&
                menus.data.content.map((m, key) => {
                  return (
                    <LineTable
                      key={key}
                      subCategory={m}
                      eyeFun={() => handleModal(<MenuDetails menu={m} />)}
                      editFun={() => updateMenuFun(m)}
                      deleteFun={() =>
                        handleModal(
                          <ModalDelete deleteFun={() => deleteMenuFun(m.id)} />
                        )
                      }
                    />
                  );
                })}
            </TableLayout>
          )}
        </div>
      </div>
      <div className="w-1/2 ">
        {menu ? (
          <MenuFormUpdate
            setMenu={setMenu}
            menu={menu}
            refetch={() => refetch()}
          />
        ) : (
          <MenuForm refetch={() => refetch()} />
        )}

        {/* {ingredient ? (
          <IngredientUpdateForm
            ingredient={ingredient}
            setMenu={setMenu}
            refetch={() => refetch()}
          />
        ) : (
          <IngredientForm refetch={() => refetch()} />
        )} */}
      </div>
    </div>
  );
}

export default MenuPage;

// function getNextFourMondays() {
//   const today = new Date();
//   const result = [];

//   // Trouver le prochain lundi à partir d'aujourd'hui
//   const dayOfWeek = today.getDay(); // 0 pour dimanche, 1 pour lundi, etc.
//   const daysUntilNextMonday = (1 - dayOfWeek + 7) % 7 || 7; // Calculer le décalage vers lundi
//   let nextMonday = new Date(today);
//   nextMonday.setDate(today.getDate() + daysUntilNextMonday);

//   // Ajouter les 4 prochains lundis
//   for (let i = 0; i < 4; i++) {
//     const monday = new Date(nextMonday);
//     monday.setDate(nextMonday.getDate() + i * 7); // Ajouter 7 jours pour chaque lundi suivant
//     result.push(monday.toISOString().split("T")[0]); // Formater en YYYY-MM-DD
//   }

//   return result;
// }
