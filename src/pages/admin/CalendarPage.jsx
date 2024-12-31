import React, { useState, useContext } from "react";
import TableLayout from "../../components/layout/TableLayout";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";

import LineTable from "../../featuresV/calendars/LineTable";
import { deleteApi } from "../../api/apiFactory";
import toast from "react-hot-toast";

import ModalDelete from "../../components/common/modal/ModalDelete";
import { ModalContext } from "../../contexts/ModalContext";
import Empty from "../../components/common/all/Empty";
import MenuDetails from "../../featuresV/menus/MenuDetails";
import MenuForm from "../../featuresV/menus/MenuForm";
import MenuFormUpdate from "../../featuresV/menus/MenuFormUpdate";
import CalendarForm from "../../featuresV/calendars/CalendarForm";
import CalendarDetails from "../../featuresV/calendars/CalendarDetails";
function CalendarPage() {
  const { handleModal } = useContext(ModalContext);
  const [calendar, setCalendar] = useState(null);
  const {
    data: calendars,
    selectPage,
    refetch,
  } = usePaginatedData(8, "/schedule/all", "calendars");

  console.log(calendars);

  const updateCalendarFun = (calendar) => {
    setCalendar(calendar);
  };
  const deleteCalendarFun = async (id) => {
    deleteApi("/schedule/", id, {
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
      <div className="w-1/3 order-1 ">
        <div className="w-full h-20 text-white font-semibold bg-red-400 shadow-lg mb-4 flex justify-center items-center rounded-md text-3xl">
          Calendars{" "}
        </div>
        <div className=" bg-primary   p-8 pb-0 shadow-lg rounded-lg  border-t-4 border-b-4 border-red-400">
          <p className="text-gray-500 capitalize -mt-4 text-end">
            {" "}
            total Calendars : {calendars?.data.totalElements}
          </p>
          {calendars && calendars.data.length == 0 ? (
            <Empty />
          ) : (
            <TableLayout
              withPaginate={true}
              columns={["name", "date ", "action"]}
              selectPage={selectPage}
              nbPages={calendars?.data.totalPages}>
              {calendars &&
                calendars.data.content.map((m, key) => {
                  return (
                    <LineTable
                      key={key}
                      subCategory={m}
                      eyeFun={() =>
                        handleModal(<CalendarDetails calendar={m} />)
                      }
                      editFun={() => updateCalendarFun(m)}
                      deleteFun={() =>
                        handleModal(
                          <ModalDelete
                            deleteFun={() => deleteCalendarFun(m.id)}
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
      <div className="w-2/3 ">
        {calendar ? (
          <MenuFormUpdate
            setCalendar={setCalendar}
            menu={calendar}
            refetch={() => refetch()}
          />
        ) : (
          <CalendarForm refetch={() => refetch()} />
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
