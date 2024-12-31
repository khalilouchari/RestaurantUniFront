import React, { useState, useContext } from "react";
import TableLayout from "../../components/layout/TableLayout";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";

import LineTable from "../../featuresV/meals/LineTable";
import { deleteApi } from "../../api/apiFactory";
import toast from "react-hot-toast";

import ModalDelete from "../../components/common/modal/ModalDelete";
import { ModalContext } from "../../contexts/ModalContext";
import Empty from "../../components/common/all/Empty";
import MealForm from "../../featuresV/meals/MealForm";
function MealPage() {
  const { handleModal } = useContext(ModalContext);
  const [ingredient, setIngredient] = useState(null);
  const {
    data: meals,
    selectPage,
    refetch,
  } = usePaginatedData(8, "/meal/all", "meals");

  console.log(meals);

  const updateIngredientFun = (ingredient) => {
    setIngredient(ingredient);
  };
  const deleteIngredientFun = async (id) => {
    deleteApi("/meal/", id, {
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
          Meals{" "}
        </div>
        <div className=" bg-primary   p-8 pb-0 shadow-lg rounded-lg  border-t-4 border-b-4 border-red-400">
          <p className="text-gray-500 capitalize -mt-4 text-end">
            {" "}
            total meals : {meals?.data.totalElements}
          </p>
          {meals && meals.data.length == 0 ? (
            <Empty />
          ) : (
            <TableLayout
              withPaginate={true}
              columns={[
                "name",
                "description",
                "prix",
                "cout",
                "date de creation",
                "action",
              ]}
              selectPage={selectPage}
              nbPages={meals?.data.totalPages}>
              {meals &&
                meals.data.content.map((ingredient, key) => {
                  return (
                    <LineTable
                      key={key}
                      subCategory={ingredient}
                      editFun={() => updateIngredientFun(ingredient)}
                      deleteFun={() =>
                        handleModal(
                          <ModalDelete
                            deleteFun={() => deleteIngredientFun(ingredient.id)}
                          />
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
        <MealForm refetch={() => refetch()} />

        {/* {ingredient ? (
          <IngredientUpdateForm
            ingredient={ingredient}
            setIngredient={setIngredient}
            refetch={() => refetch()}
          />
        ) : (
          <IngredientForm refetch={() => refetch()} />
        )} */}
      </div>
    </div>
  );
}

export default MealPage;
