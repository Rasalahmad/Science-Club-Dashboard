import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useLocation } from "react-router-dom";
import CommitteeDataTable from "../../components/datatable/CommitteeDataTable";
import FacultyDataTable from "../../components/datatable/FacultyDataTable";
import NoticeDataTable from "../../components/datatable/NoticeDataTable";
import EventDataTable from "../../components/datatable/EventDataTable";
import JournalDataTable from "../../components/datatable/JournalDataTable";
import CourseDataTable from "../../components/datatable/CourseDataTable";
import ResultDataTabe from "../../components/datatable/ResultDataTable";

const List = () => {
  const location = useLocation();

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {location.pathname === "/faculty" ? (
          <FacultyDataTable />
        ) : location.pathname === "/committee" ? (
          <CommitteeDataTable />
        ) : location.pathname === "/notices" ? (
          <NoticeDataTable />
        ) : location.pathname === "/events" ? (
          <EventDataTable />
        ) : location.pathname === "/journals" ? (
          <JournalDataTable />
        ) : location.pathname === "/courses" ? (
          <CourseDataTable />
        ) : location.pathname === "/result" ? (
          <ResultDataTabe />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default List;
